import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHeart, FaUsers, FaGraduationCap, FaArrowLeft, FaWhatsapp, FaPhone, FaEnvelope, FaHandHoldingHeart } from 'react-icons/fa';

export default function DonationSuccess() {
  const location = useLocation();
  const { donationData } = location.state || {};

  // Fallback data if no state is passed
  const donation = donationData || {
    name: 'Dear Donor',
    amount: '0',
    receiptNumber: 'N/A',
    email: '',
    paymentId: 'N/A',
    date: new Date().toLocaleString('en-IN')
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
MA EQUAL FOUNDATION - DONATION RECEIPT

Receipt Number: ${donation.receiptNumber}
Donor Name: ${donation.name}
Email: ${donation.email}
Amount: ₹${donation.amount}
Payment ID: ${donation.paymentId}
Date: ${donation.date}
Status: Successfully Completed

Thank you for your generous contribution!

MA Equal Foundation
Chandausi road Near maulana khurshid Saif khan Sarai
Sambhal, 244302 Uttar Pradesh, India
Email: maequalfoundationtrust@gmail.com
Phone: +91 7906891253
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MA_Equal_Foundation_Receipt_${donation.receiptNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Matching donate page style */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative container mx-auto text-center text-white z-10 px-4">
          <div className="animate-bounce mb-6">
            <FaCheckCircle className="mx-auto text-6xl text-white/90" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            🎉 Donation Successful! 🎉
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-green-100 leading-relaxed">
            Thank you {donation.name} for your generous contribution! Your kindness creates hope and opportunities.
          </p>
          
          {/* Stats Cards - Matching donate page style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">₹{donation.amount}</div>
              <div className="text-xs sm:text-sm text-green-100">Donation Amount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-lg sm:text-xl font-bold mb-2">{donation.receiptNumber}</div>
              <div className="text-xs sm:text-sm text-green-100">Receipt Number</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-lg sm:text-xl font-bold mb-2">✅ Completed</div>
              <div className="text-xs sm:text-sm text-green-100">Payment Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                  Payment Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Payment ID</p>
                        <p className="font-semibold text-gray-800">{donation.paymentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-semibold text-gray-800">{donation.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-semibold text-green-600 flex items-center">
                          <FaCheckCircle className="mr-2" />
                          Successfully Completed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Confirmation</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Receipt sent to</p>
                        <p className="font-semibold text-gray-800">{donation.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Organization</p>
                        <p className="font-semibold text-gray-800">MA Equal Foundation</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tax Deductible</p>
                        <p className="font-semibold text-green-600">Yes, under 80G</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8 mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaHeart className="text-red-500 mr-3" />
                    Your Impact on Education
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Your donation of ₹{donation.amount} will directly support educational initiatives, 
                    helping underprivileged students access quality education and creating opportunities 
                    for a brighter future. Every contribution makes a difference in a child's life.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <FaGraduationCap className="text-3xl text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-800">Education Support</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <FaUsers className="text-3xl text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-800">Community Impact</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <FaHandHoldingHeart className="text-3xl text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-800">Lives Changed</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={handleDownloadReceipt}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <FaDownload className="mr-2" />
                    Download Receipt
                  </button>
                  <Link
                    to="/donate"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-center"
                  >
                    <FaHeart className="mr-2" />
                    Donate Again
                  </Link>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Stay Connected With Us</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <a
                      href="tel:+917906891253"
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FaPhone className="mr-2" />
                      Call Us
                    </a>
                    <a
                      href="https://wa.me/917906891253"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp
                    </a>
                    <a
                      href="mailto:maequalfoundationtrust@gmail.com"
                      className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <FaEnvelope className="mr-2" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Quote Section */}
      <section className="py-12 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <p className="text-lg sm:text-xl text-gray-700 italic leading-relaxed mb-4">
                "Your generosity today creates ripples of positive change that will be felt for generations. 
                Thank you for believing in our mission and making education accessible to all."
              </p>
              <p className="text-blue-600 font-bold text-lg">- MA Equal Foundation Team 💙</p>
            </div>
            
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}