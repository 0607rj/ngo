import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHeart, FaUsers, FaGraduationCap, FaArrowLeft, FaWhatsapp, FaPhone, FaEnvelope, FaHandHoldingHeart } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';

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
    const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Load and add logo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      generatePDFContent(true);
    };
    
    img.onerror = function() {
      generatePDFContent(false);
    };
    
    const generatePDFContent = (hasLogo) => {
      // Professional header with gradient effect
      pdf.setFillColor(25, 118, 210); // Professional blue
      pdf.rect(0, 0, pageWidth, 60, 'F');
      
      // Add white accent line
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 55, pageWidth, 5, 'F');
      
      if (hasLogo) {
        try {
          // Get image dimensions and calculate proper scaling
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Calculate aspect ratio to prevent stretching
          const imgAspectRatio = img.width / img.height;
          const maxLogoWidth = 20;
          const maxLogoHeight = 20;
          
          let logoWidth, logoHeight;
          
          if (imgAspectRatio > 1) {
            // Landscape image
            logoWidth = maxLogoWidth;
            logoHeight = maxLogoWidth / imgAspectRatio;
          } else {
            // Portrait or square image
            logoHeight = maxLogoHeight;
            logoWidth = maxLogoHeight * imgAspectRatio;
          }
          
          const logoX = 20;
          const logoY = 15 + (20 - logoHeight) / 2; // Center vertically
          
          // Add logo with proper aspect ratio
          pdf.addImage(canvas, 'PNG', logoX, logoY, logoWidth, logoHeight, undefined, 'FAST');
        } catch (error) {
          console.log('Logo processing failed, continuing without logo');
        }
      }
      
      // Organization name and details
    // Two-line organization name
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    const orgNameX = hasLogo ? 50 : 20;
    pdf.text('M A EQUAL', orgNameX, 22);
    pdf.setTextColor(34, 197, 94); // Tailwind green-600
    pdf.setFontSize(18);
    pdf.text('FOUNDATION', orgNameX, 32);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Educational Trust & Social Welfare Organization', orgNameX, 40);
    pdf.setFontSize(8);
    pdf.text('Established for promoting education and social welfare', orgNameX, 47);
    pdf.text('Registration: Chandausi Road, Sambhal, UP - 244302', orgNameX, 54);
      
      // Receipt title section
      let currentY = 75;
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(15, currentY, pageWidth - 30, 20, 3, 3, 'F');
      
      pdf.setTextColor(25, 118, 210);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text('DONATION RECEIPT', pageWidth / 2, currentY + 13, { align: 'center' });
      
      currentY += 35;
      
      // Two-column layout for receipt and donor info
      const leftColWidth = (pageWidth - 40) / 2 - 5;
      const rightColWidth = (pageWidth - 40) / 2 - 5;
      const leftColX = 15;
      const rightColX = 15 + leftColWidth + 10;
      
      // Receipt Details (Left Column)
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(leftColX, currentY, leftColWidth, 60, 5, 5, 'FD');
      
      pdf.setTextColor(25, 118, 210);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('RECEIPT DETAILS', leftColX + 5, currentY + 10);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      
      let detailY = currentY + 20;
      
      // Receipt fields with proper formatting
      pdf.setFont('helvetica', 'bold');
      pdf.text('Receipt No:', leftColX + 5, detailY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${donation.receiptNumber}`, leftColX + 5, detailY + 5);
      
      detailY += 15;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Date & Time:', leftColX + 5, detailY);
      pdf.setFont('helvetica', 'normal');
      // Format date properly - handle different date formats
      let formattedDate;
      try {
        const date = new Date(donation.date);
        if (isNaN(date.getTime())) {
          // If date is invalid, use current date
          formattedDate = new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        } else {
          formattedDate = date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        }
      } catch (error) {
        formattedDate = new Date().toLocaleString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
      pdf.text(formattedDate, leftColX + 5, detailY + 5);
      
      detailY += 15;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Payment ID:', leftColX + 5, detailY);
      pdf.setFont('helvetica', 'normal');
      // Handle long payment IDs
      const paymentId = donation.paymentId.toString();
      if (paymentId.length > 20) {
        pdf.text(paymentId.substring(0, 20), leftColX + 5, detailY + 5);
        pdf.text(paymentId.substring(20), leftColX + 5, detailY + 10);
      } else {
        pdf.text(paymentId, leftColX + 5, detailY + 5);
      }
      
      // Donor Information (Right Column)
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(rightColX, currentY, rightColWidth, 60, 5, 5, 'FD');
      
      pdf.setTextColor(25, 118, 210);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('DONOR INFORMATION', rightColX + 5, currentY + 10);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      
      let donorY = currentY + 20;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('Name:', rightColX + 5, donorY);
      pdf.setFont('helvetica', 'normal');
      // Handle long names
      const donorName = donation.name.toString();
      if (donorName.length > 25) {
        pdf.text(donorName.substring(0, 25), rightColX + 5, donorY + 5);
        pdf.text(donorName.substring(25), rightColX + 5, donorY + 10);
        donorY += 5;
      } else {
        pdf.text(donorName, rightColX + 5, donorY + 5);
      }
      
      donorY += 15;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Email:', rightColX + 5, donorY);
      pdf.setFont('helvetica', 'normal');
      // Handle long emails
      const email = donation.email.toString();
      if (email.length > 25) {
        pdf.text(email.substring(0, 25), rightColX + 5, donorY + 5);
        pdf.text(email.substring(25), rightColX + 5, donorY + 10);
      } else {
        pdf.text(email, rightColX + 5, donorY + 5);
      }
      
      currentY += 80;
      
      // Donation Amount - Professional highlight section
      pdf.setFillColor(76, 175, 80); // Professional green
      pdf.roundedRect(15, currentY, pageWidth - 30, 35, 8, 8, 'F');
      
      // White content box inside
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(20, currentY + 5, pageWidth - 40, 25, 5, 5, 'F');
      
      // Amount text with proper rupee symbol
      pdf.setTextColor(76, 175, 80);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text('DONATION AMOUNT', 25, currentY + 15);
      
      // Format amount with proper Indian currency formatting
      const amount = parseFloat(donation.amount);
      const formattedAmount = amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      pdf.setFontSize(24);
      pdf.setTextColor(25, 118, 210);
      // Use proper rupee symbol
      pdf.text(`₹ ${formattedAmount}`, 25, currentY + 25);
      
      // Status badge with rupee symbol
      pdf.setFillColor(76, 175, 80);
      pdf.roundedRect(pageWidth - 70, currentY + 8, 45, 15, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('₹ VERIFIED', pageWidth - 67, currentY + 17);
      
      currentY += 50;
      
      // Thank you section
      pdf.setFillColor(255, 248, 225); // Warm yellow
      pdf.roundedRect(15, currentY, pageWidth - 30, 30, 5, 5, 'F');
      
      pdf.setTextColor(184, 134, 11);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text('🙏 THANK YOU FOR YOUR GENEROSITY', pageWidth / 2, currentY + 12, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text('Your contribution will help provide quality education to underprivileged children.', pageWidth / 2, currentY + 22, { align: 'center' });
      
      currentY += 45;
      
      // Contact information footer - enhanced design
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(15, currentY, pageWidth - 30, 35, 5, 5, 'F');
      
      currentY += 8;
      
      pdf.setTextColor(25, 118, 210);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('CONTACT INFORMATION', 20, currentY);
      
      currentY += 10;
      
      // Address
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text('📍 Address:', 20, currentY);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Chandausi Road, Saif Khan Sarai', 50, currentY);
      currentY += 5;
      pdf.text('Sambhal - 244302, Uttar Pradesh, India', 50, currentY);
      
      currentY += 8;
      
      // Email and Phone in two columns
      pdf.setFont('helvetica', 'bold');
      pdf.text('📧 Email:', 20, currentY);
      pdf.setFont('helvetica', 'normal');
  pdf.text('maequalfoundationtrust@gmail.com', 45, currentY);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('📞 Phone:', 20, currentY + 5);
      pdf.setFont('helvetica', 'normal');
      pdf.text('+91 7906891253', 45, currentY + 5);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('💬 WhatsApp:', 120, currentY + 5);
      pdf.setFont('helvetica', 'normal');
      pdf.text('+91 7906891253', 155, currentY + 5);
      
      currentY += 15;
      
      // Footer disclaimer
      currentY += 15;
      pdf.setTextColor(150, 150, 150);
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(7);
      pdf.text('This is a computer-generated receipt and does not require a signature. Keep this receipt for your records.', pageWidth / 2, currentY, { align: 'center' });
      
      // Save the PDF
      pdf.save(`MA_Equal_Foundation_Receipt_${donation.receiptNumber}.pdf`);
    };
    
    // Try to load the logo
    img.src = nav;
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
                        <p className="font-semibold text-gray-800">M A Equal Foundation</p>
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
                    Download PDF Receipt
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
              <p className="text-blue-600 font-bold text-lg">- M A Equal Foundation Team 💙</p>
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