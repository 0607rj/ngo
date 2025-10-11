import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../models/Donation.js';
import Cause from '../models/Cause.js';
import nodemailer from 'nodemailer';

// Initialize Razorpay instance only when needed
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.');
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Enhanced input validation functions
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Indian phone number validation (10 digits, can start with +91)
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

const validateName = (name) => {
  // Name should be at least 2 characters and contain only letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

const validateAmount = (amount) => {
  // Amount should be between ₹1 and ₹500000 (5 lakhs)
  return amount && amount >= 1 && amount <= 500000;
};

// Create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { amount, donor } = req.body;

    // Enhanced validation
    const validationErrors = [];

    if (!amount || !validateAmount(amount)) {
      validationErrors.push("Amount must be between ₹1 and ₹5,00,000");
    }

    if (!donor) {
      validationErrors.push("Donor information is required");
    } else {
      if (!donor.name || !validateName(donor.name)) {
        validationErrors.push("Please enter a valid name (2-50 characters, letters only)");
      }

      if (!donor.email || !validateEmail(donor.email)) {
        validationErrors.push("Please enter a valid email address");
      }

      if (!donor.phone || !validatePhone(donor.phone)) {
        validationErrors.push("Please enter a valid Indian phone number (10 digits)");
      }
    }

    // Check if email already exists in recent donations (prevent spam)
    if (donor && donor.email) {
      const recentDonation = await Donation.findOne({
        email: donor.email,
        createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) } // 5 minutes
      });

      if (recentDonation) {
        validationErrors.push("Please wait 5 minutes between donations from the same email");
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Create order with Razorpay
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        donor_name: donor.name,
        donor_email: donor.email,
        donor_phone: donor.phone,
      },
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);

    // Save order details to database
    const donation = new Donation({
      orderId: order.id,
      name: donor.name,
      email: donor.email,
      mobile: donor.phone,
      amount: amount,
      currency: order.currency,
      status: 'pending',
      createdAt: new Date(),
    });

    await donation.save();

    res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donor,
      amount,
    } = req.body;

    // Create signature to verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment is valid, update database with complete information
      const donation = await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: 'completed',
          paidAt: new Date(),
          // Save additional donor information
          notes: `Payment completed successfully. Donor: ${donor.name}, Email: ${donor.email}, Phone: ${donor.phone}`,
        },
        { new: true }
      );

      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation record not found",
        });
      }

      // Generate receipt number if not exists
      if (!donation.receiptNumber) {
        const totalCompletedDonations = await Donation.countDocuments({ status: 'completed' });
        donation.receiptNumber = `MAEF-${new Date().getFullYear()}-${String(totalCompletedDonations).padStart(6, '0')}`;
        await donation.save();
      }

      // Send comprehensive confirmation email to donor
      await sendThankYouEmail(donor, amount, razorpay_payment_id, donation.receiptNumber);

      // Send detailed notification email to admin
      await sendAdminNotificationEmail(donor, amount, razorpay_payment_id, donation);

      // Log successful payment for admin tracking
      console.log(`✅ Payment Successful: ₹${amount} from ${donor.name} (${donor.email}) - Payment ID: ${razorpay_payment_id}`);

      res.status(200).json({
        success: true,
        message: "Payment verified successfully! Thank you for your generous donation.",
        donation: {
          receiptNumber: donation.receiptNumber,
          amount: donation.amount,
          paymentId: donation.paymentId,
          date: donation.paidAt,
          status: donation.status
        },
      });
    } else {
      // Payment verification failed
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: 'failed' }
      );

      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: "Payment verification error",
      error: error.message,
    });
  }
};

// Legacy create function (keep for compatibility)
export const create = async (req,res) =>{
  try{
    const { name,email,mobile,amount,purpose,causeId } = req.body;
    if(!amount || amount <= 0) return res.status(400).json({ msg: 'Invalid amount' });

    const donation = new Donation({ name,email,mobile,amount,purpose,cause: causeId, status: 'completed' });
    await donation.save();

    if(causeId){
      await Cause.findByIdAndUpdate(causeId, { $inc: { raisedAmount: amount } });
    }

    res.json({ success: true, donation });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Get all donations with detailed information (admin)
export const list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status; // Filter by status if provided

    // Build filter query
    let filter = {};
    if (status && ['pending', 'completed', 'failed'].includes(status)) {
      filter.status = status;
    }

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name email mobile amount status paymentId receiptNumber paidAt createdAt notes');

    const total = await Donation.countDocuments(filter);

    // Calculate statistics
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const completedDonations = await Donation.find({ status: 'completed' });
    const totalAmountRaised = completedDonations.reduce((sum, donation) => sum + donation.amount, 0);

    res.status(200).json({
      success: true,
      donations,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      statistics: {
        totalDonations: total,
        totalAmountRaised,
        statusBreakdown: stats,
        completedCount: completedDonations.length
      }
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
      error: error.message,
    });
  }
};

// Get donation statistics for dashboard
export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const completedDonations = await Donation.countDocuments({ status: 'completed' });
    const pendingDonations = await Donation.countDocuments({ status: 'pending' });
    const failedDonations = await Donation.countDocuments({ status: 'failed' });
    
    const totalAmountResult = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;
    
    // Recent donations (last 7 days)
    const recentDonations = await Donation.find({
      status: 'completed',
      paidAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }).sort({ paidAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      stats: {
        total: totalDonations,
        completed: completedDonations,
        pending: pendingDonations,
        failed: failedDonations,
        totalAmount: totalAmount,
        recentDonations: recentDonations
      }
    });
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation statistics",
      error: error.message,
    });
  }
};

// Enhanced Thank You email to donor
const sendThankYouEmail = async (donor, amount, paymentId, receiptNumber) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: donor.email,
      subject: `🙏 Thank You ${donor.name} - Your Donation Receipt #${receiptNumber} - MA Equal Foundation`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563EB, #7C3AED); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">🙏 Thank You!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your kindness creates hope</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #2563EB; margin-bottom: 25px; font-size: 24px;">Dear ${donor.name},</h2>
            
            <p style="font-size: 18px; line-height: 1.7; margin-bottom: 25px; color: #333;">
              We are incredibly grateful for your generous donation of <strong style="color: #2563EB;">₹${amount}</strong> to MA Equal Foundation. 
              Your contribution directly impacts lives and helps us continue our mission of creating educational opportunities for those who need it most.
            </p>
            
            <!-- Receipt Box -->
            <div style="background: linear-gradient(45deg, #e3f2fd, #f3e5f5); border-left: 5px solid #2563EB; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2563EB; margin-top: 0; font-size: 20px;">📄 Official Receipt</h3>
              <table style="width: 100%; font-size: 16px;">
                <tr><td style="padding: 5px 0;"><strong>Receipt Number:</strong></td><td>${receiptNumber}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Donation Amount:</strong></td><td>₹${amount}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Payment ID:</strong></td><td>${paymentId}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Date & Time:</strong></td><td>${new Date().toLocaleString('en-IN')}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Status:</strong></td><td><span style="color: #10B981; font-weight: bold;">✅ Successfully Completed</span></td></tr>
                <tr><td style="padding: 5px 0;"><strong>Donor Name:</strong></td><td>${donor.name}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${donor.email}</td></tr>
              </table>
            </div>
            
            <!-- Impact Message -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px dashed #2563EB;">
              <h3 style="color: #2563EB; margin-top: 0;">🌟 Your Impact</h3>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #555;">
                Your donation of ₹${amount} will help us provide educational resources, support underprivileged students, 
                and create opportunities for those who need it most. Every rupee is used transparently for our programs.
              </p>
            </div>
            
            <!-- Contact Section -->
            <div style="text-align: center; margin: 35px 0;">
              <h3 style="color: #2563EB; margin-bottom: 20px;">Stay Connected</h3>
              <div style="margin: 20px 0;">
                <a href="tel:+917906891253" style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                  📞 Call Us: +91 7906891253
                </a>
                <a href="https://wa.me/917906891253" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                  💬 WhatsApp
                </a>
              </div>
            </div>
            
            <!-- Thank You Note -->
            <div style="background: linear-gradient(45deg, #fef3e2, #fce7f6); padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
              <p style="margin: 0; font-size: 18px; font-style: italic; color: #2563EB;">
                "Thank you for believing in our mission and making a difference in someone's life today. 
                Together, we are building a brighter future." 💙
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #2563EB; color: white; padding: 30px; text-align: center; border-radius: 0 0 10px 10px;">
            <h3 style="margin: 0 0 15px 0; font-size: 20px;">MA Equal Foundation</h3>
            <p style="margin: 5px 0; font-size: 14px;">Chandausi road Near maulana khurshid Saif khan Sarai</p>
            <p style="margin: 5px 0; font-size: 14px;">Sambhal, 244302 Uttar Pradesh, India</p>
            <p style="margin: 5px 0; font-size: 14px;">Email: maequalfoundationtrust@gmail.com</p>
            <div style="margin-top: 20px;">
              <a href="https://www.facebook.com/share/1BU4hsSJpF/" style="color: white; margin: 0 10px; font-size: 18px;">📘</a>
              <a href="https://www.instagram.com/maequalfoundation?igsh=b2hmaTBzYnJqeWR3" style="color: white; margin: 0 10px; font-size: 18px;">📸</a>
            </div>
            <p style="margin: 20px 0 0 0; font-size: 12px; opacity: 0.8;">
              This is an automated receipt. Please keep it for your records.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Thank you email sent to donor: ${donor.email}`);
  } catch (error) {
    console.error('❌ Error sending thank you email:', error);
  }
};

// Enhanced admin notification email
const sendAdminNotificationEmail = async (donor, amount, paymentId, donationRecord) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `💰 NEW DONATION ALERT - ₹${amount} from ${donor.name} - Receipt #${donationRecord.receiptNumber}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🎉 NEW DONATION RECEIVED!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">MA Equal Foundation</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px; background: #f9f9f9;">
            <!-- Amount Highlight -->
            <div style="background: linear-gradient(45deg, #d1fae5, #a7f3d0); border-left: 5px solid #10B981; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
              <h2 style="margin: 0; color: #065f46; font-size: 36px;">₹${amount}</h2>
              <p style="margin: 5px 0 0 0; color: #065f46; font-weight: bold;">Donation Amount</p>
            </div>
            
            <!-- Donor Details -->
            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
              <h3 style="color: #10B981; margin-top: 0; font-size: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">👤 Donor Information</h3>
              <table style="width: 100%; font-size: 16px;">
                <tr><td style="padding: 8px 0; width: 30%;"><strong>Name:</strong></td><td style="color: #059669;">${donor.name}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td><a href="mailto:${donor.email}" style="color: #2563EB;">${donor.email}</a></td></tr>
                <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td><a href="tel:${donor.phone}" style="color: #2563EB;">${donor.phone}</a></td></tr>
                <tr><td style="padding: 8px 0;"><strong>WhatsApp:</strong></td><td><a href="https://wa.me/91${donor.phone.replace(/\D/g, '')}" style="color: #25D366;">Send Message</a></td></tr>
              </table>
            </div>
            
            <!-- Payment Details -->
            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
              <h3 style="color: #10B981; margin-top: 0; font-size: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">💳 Payment Details</h3>
              <table style="width: 100%; font-size: 16px;">
                <tr><td style="padding: 8px 0; width: 35%;"><strong>Receipt Number:</strong></td><td style="color: #059669; font-weight: bold;">${donationRecord.receiptNumber}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Payment ID:</strong></td><td style="font-family: monospace; font-size: 14px;">${paymentId}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Order ID:</strong></td><td style="font-family: monospace; font-size: 14px;">${donationRecord.orderId}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Amount:</strong></td><td style="color: #059669; font-weight: bold; font-size: 18px;">₹${amount}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Date & Time:</strong></td><td>${new Date().toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'full',
                  timeStyle: 'medium'
                })}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Status:</strong></td><td style="color: #10B981; font-weight: bold;">✅ Successfully Completed</td></tr>
              </table>
            </div>
            
            <!-- Action Items -->
            <div style="background: #fef3c7; border-left: 5px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #92400e; margin-top: 0;">⚡ Action Items</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Thank you email has been automatically sent to donor</li>
                <li>Donation record saved in database with receipt number</li>
                <li>Consider following up for larger donations (₹1000+)</li>
                <li>Update donor in your CRM system if needed</li>
                <li>Share updates about fund utilization with the donor</li>
              </ul>
            </div>
            
            <!-- Quick Actions -->
            <div style="text-align: center; margin: 25px 0;">
              <h3 style="color: #10B981;">Quick Actions</h3>
              <a href="mailto:${donor.email}" style="display: inline-block; background: #2563EB; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                ✉️ Email Donor
              </a>
              <a href="tel:${donor.phone}" style="display: inline-block; background: #10B981; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                📞 Call Donor
              </a>
              <a href="https://wa.me/91${donor.phone.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                💬 WhatsApp
              </a>
            </div>
            
            <!-- Statistics -->
            <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #0277bd; margin-top: 0;">📊 Current Stats</h3>
              <p style="margin: 5px 0; color: #01579b;">Check your admin dashboard for updated donation statistics</p>
              <p style="margin: 5px 0; color: #01579b; font-size: 14px;">Receipt: ${donationRecord.receiptNumber} | Database ID: ${donationRecord._id}</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #065f46; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">MA Equal Foundation Admin Panel</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">This is an automated notification for donation tracking</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification sent for donation: ₹${amount} from ${donor.name}`);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
  }
};
