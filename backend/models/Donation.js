import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  // Basic donor information
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, default: 'General Donation' },
  cause: { type: mongoose.Schema.Types.ObjectId, ref: 'Cause' },
  
  // Razorpay payment details
  orderId: { type: String }, // Razorpay order ID
  paymentId: { type: String }, // Razorpay payment ID
  signature: { type: String }, // Razorpay signature for verification
  currency: { type: String, default: 'INR' },
  
  // Payment status and timestamps
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paidAt: { type: Date },
  
  // Additional metadata
  notes: { type: String },
  receiptNumber: { type: String }, // For generating receipts
}, { 
  timestamps: true // This adds createdAt and updatedAt
});

// Index for better query performance
DonationSchema.index({ orderId: 1 });
DonationSchema.index({ paymentId: 1 });
DonationSchema.index({ email: 1 });
DonationSchema.index({ status: 1 });
DonationSchema.index({ createdAt: -1 });

// Pre-save middleware to generate receipt number
DonationSchema.pre('save', async function(next) {
  if (!this.receiptNumber && this.status === 'completed') {
    const count = await mongoose.models.Donation.countDocuments({ status: 'completed' });
    this.receiptNumber = `MAEF-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;
