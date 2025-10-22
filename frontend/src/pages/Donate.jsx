import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaHandHoldingHeart, FaHeart, FaGraduationCap, FaSpinner } from 'react-icons/fa';
import { RiSecurePaymentLine, RiHeartsFill } from 'react-icons/ri';
import qr from '../assets/qr.jpg';

import nav from '../assets/nav.png';


export default function Donate() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const predefinedAmounts = [
    { amount: 800, label: '₹800', description: '1 Month Education & Health Care' },
    { amount: 2400, label: '₹2400', description: 'Quarterly Education & Health Care' },
    { amount: 4500, label: '₹4500', description: 'Half Yearly Education & Health Care' },
    { amount: 11000, label: '₹11000', description: '1 Year Education, School Supplies & Health Care' }
  ];

  // Handle donor info change
  const handleDonorInfoChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  // Create Razorpay order
  const createRazorpayOrder = async (amount) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donations/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          donor: donorInfo
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Show detailed error message from backend
        const errorMessage = data.errors ? data.errors.join('\n') : data.message || 'Failed to create order';
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create payment order. Please try again.');
      setLoading(false);
      return null;
    }
  };

  // Verify payment on backend (background process - no loading state changes)
  const verifyPayment = async (paymentData) => {
    try {
      console.log('🔄 Verifying payment with backend...', paymentData);
      console.log('🌐 Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donations/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📋 Response data:', data);
      
      if (response.ok) {
        console.log('✅ Payment verification successful!');
        return data; // Return the response data
      } else {
        console.error('❌ Payment verification failed:', data);
        throw new Error(data.message || data.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('💥 Error in payment verification process:', error);
      throw error; // Re-throw for handling in caller
    }
  };

  // Enhanced frontend validation
  const validateForm = () => {
    const errors = [];
    
    // Amount validation
    const amount = selectedAmount || customAmount;
    if (!amount || amount <= 0) {
      errors.push('Please select or enter a valid donation amount');
    } else if (amount < 1) {
      errors.push('Minimum donation amount is ₹1');
    } else if (amount > 500000) {
      errors.push('Maximum donation amount is ₹5,00,000');
    }
    
    // Name validation
    if (!donorInfo.name || donorInfo.name.trim().length < 2) {
      errors.push('Please enter your full name (minimum 2 characters)');
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(donorInfo.name.trim())) {
      errors.push('Name should contain only letters and spaces');
    }
    
    // Email validation
    if (!donorInfo.email) {
      errors.push('Please enter your email address');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(donorInfo.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (Indian numbers)
    if (!donorInfo.phone) {
      errors.push('Please enter your phone number');
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(donorInfo.phone.replace(/\s+/g, ''))) {
      errors.push('Please enter a valid Indian phone number (10 digits)');
    }
    
    return errors;
  };

  const loadRazorpay = async () => {
    const amount = selectedAmount || customAmount;
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      return;
    }

    setError(''); // Clear any previous errors

    // Create order on backend
    const orderData = await createRazorpayOrder(amount);
    if (!orderData) return;
    
    // Safety timeout to reset loading state (in case something goes wrong)
    const loadingTimeout = setTimeout(() => {
      console.warn('⚠️ Payment timeout - resetting loading state');
      setLoading(false);
    }, 30000); // 30 seconds timeout

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "MA Equal Foundation",
      description: "Donation for Education & Social Welfare",
      image: nav, // Add your logo here
      order_id: orderData.id,
      handler: function (response) {
        console.log('✅ Payment completed successfully!', response);
        
        // Generate immediate receipt number from payment ID
        const tempReceiptNumber = 'MEF' + response.razorpay_payment_id.slice(-8).toUpperCase();
        
        // Prepare success data immediately (no waiting)
        const successData = {
          name: donorInfo.name,
          amount: amount,
          receiptNumber: tempReceiptNumber,
          email: donorInfo.email,
          paymentId: response.razorpay_payment_id,
          date: new Date().toISOString() // Use ISO string for proper date formatting
        };
        
        console.log('🚀 Redirecting to success page immediately...');
        
        // Clear timeout and reset form and loading state IMMEDIATELY
        clearTimeout(loadingTimeout);
        setSelectedAmount('');
        setCustomAmount('');
        setDonorInfo({ name: '', email: '', phone: '' });
        setLoading(false);
        
        // Navigate immediately - don't wait for verification
        navigate('/donation-success', { 
          state: { donationData: successData },
          replace: true 
        });
        
        // Verify payment in background (don't block UI)
        setTimeout(() => {
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donor: donorInfo,
            amount: amount
          }).then((verificationData) => {
            console.log('✅ Background verification completed:', verificationData);
            // Could update localStorage or send notification if needed
          }).catch((error) => {
            console.error('❌ Background verification failed:', error);
            // Don't show error to user since they're already on success page
          });
        }, 100);
      },
      prefill: {
        name: donorInfo.name,
        email: donorInfo.email,
        contact: donorInfo.phone
      },
      notes: {
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        purpose: "Educational Support"
      },
      theme: {
        color: "#2563EB"
      },
      modal: {
        ondismiss: function() {
          clearTimeout(loadingTimeout);
          setLoading(false);
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    
    // Ensure loading is reset on payment failure
    razorpay.on('payment.failed', function (response) {
      console.error('💳 Payment failed:', response);
      clearTimeout(loadingTimeout);
      setLoading(false);
      alert(`Payment failed: ${response.error.description}`);
    });
    
    // Add success logging - loading already handled in handler
    razorpay.on('payment.success', function (response) {
      console.log('🎉 Razorpay payment.success event fired:', response);
    });
    
    // Add error handling for razorpay initialization
    try {
      razorpay.open();
    } catch (error) {
      console.error('Failed to open Razorpay:', error);
      setLoading(false);
      alert('Failed to initialize payment gateway. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative container mx-auto text-center text-white z-10">
          <div className="animate-bounce-slow mb-6">
            <FaHandHoldingHeart className="mx-auto text-6xl text-white/90" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Lives Through <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Your Generosity
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Join us in creating lasting change. Your contribution helps provide education
            and opportunities to those who need it most.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">500+</div>
              <div className="text-xs sm:text-sm text-blue-100">Students Supported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">95%</div>
              <div className="text-xs sm:text-sm text-blue-100">Funds to Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">15+</div>
              <div className="text-xs sm:text-sm text-blue-100">Years of Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Payment Method
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every contribution counts. Select your preferred way to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Razorpay Section */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-10"></div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto relative">
                  <RiSecurePaymentLine className="text-4xl text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold my-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Secure Payment via Razorpay
              </h3>

              {/* Donor Information Form */}
              <div className="mb-6 sm:mb-8 space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Your Information</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={donorInfo.name}
                  onChange={handleDonorInfoChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={donorInfo.phone}
                  onChange={handleDonorInfoChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {predefinedAmounts.map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => {
                      setSelectedAmount(item.amount);
                      setCustomAmount(item.amount.toString());
                    }}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      selectedAmount === item.amount
                        ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-blue-100 shadow-lg'
                        : 'border-gray-100 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl font-bold">{item.label}</div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6 sm:mb-8">
                <input
                  type="number"
                  placeholder="Enter custom amount (₹)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && customAmount && !loading) {
                      handleDonate();
                    }
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                onClick={loadRazorpay}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 sm:py-6 px-6 sm:px-8 rounded-xl text-lg sm:text-xl font-bold hover:from-blue-700 hover:to-blue-600 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
                disabled={loading || (!selectedAmount && !customAmount)}
              >
                {loading ? (
                  <>
                    <FaSpinner className="mr-2 text-2xl animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <RiSecurePaymentLine className="mr-2 text-2xl" />
                    Donate ₹{selectedAmount || customAmount || 0}
                  </>
                )}
              </button>
            </div>

            {/* QR Code Section */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-10"></div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto relative">
                  <FaQrcode className="text-3xl sm:text-4xl text-white" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold my-6 sm:my-8 text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Quick UPI Payment
              </h3>
              
              <div className="relative group mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
                  <img 
                    src={qr}
                    alt="UPI QR Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-xl shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* UPI ID Section - Commented out for future use */}
              {/*
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 sm:p-6 text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-2">Or use UPI ID</p>
                <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent break-all">
                  maequalfoundation@upi
                </p>
              </div>
              */}
            </div>

          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <FaHeart className="text-4xl text-red-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Change Lives</h3>
              <p className="text-gray-600">
                Your donation directly supports children's education and development, creating lasting impact in their lives.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <FaHandHoldingHeart className="text-4xl text-blue-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Create Opportunities</h3>
              <p className="text-gray-600">
                Help provide essential resources and tools needed for quality education and skill development.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <FaGraduationCap className="text-4xl text-purple-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Build Future</h3>
              <p className="text-gray-600">
                Support the next generation of leaders and contribute to a brighter, more educated society.
              </p>
            </div>
          </div>

          {/* Note Card */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Important Note
              </div>
              <p className="text-center text-gray-600 font-medium">
                Please save the transaction ID for your records. You'll receive a confirmation email after your successful donation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
    
  