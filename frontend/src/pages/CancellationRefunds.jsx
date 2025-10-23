import React from 'react';
import { FaArrowLeft, FaPhone, FaEnvelope, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CancellationRefunds() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaInfoCircle className="text-blue-600 mr-3" />
            Cancellation and Refund Policy
          </h1>
          <p className="text-gray-600 text-lg">
            M A Equal Foundation - Transparent Donation Policies
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
          <div className="flex items-center mb-2">
            <FaExclamationTriangle className="text-yellow-600 mr-2" />
            <h2 className="text-lg font-semibold text-yellow-800">Important Notice</h2>
          </div>
          <p className="text-yellow-700">
            As a registered NGO, all donations made to M A Equal Foundation are considered voluntary contributions 
            towards our charitable activities. Please read this policy carefully before making a donation.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Section 1: Donation Nature */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              1. Nature of Donations
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                • <strong>Voluntary Contributions:</strong> All donations made to M A Equal Foundation are voluntary 
                charitable contributions intended to support our educational and welfare programs.
              </p>
              <p>
                • <strong>Non-Commercial:</strong> Donations are not payments for goods or services, and no 
                commercial transaction is involved.
              </p>
              <p>
                • <strong>Tax Benefits:</strong> Donations are eligible for tax deductions under Section 80G 
                of the Income Tax Act, 1961.
              </p>
            </div>
          </section>

          {/* Section 2: Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              2. Refund Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800">2.1 General Policy</h3>
              <p>
                As per standard NGO practices and Indian charitable organization guidelines, donations are 
                <strong> generally non-refundable</strong> once successfully processed, as they are immediately 
                allocated to ongoing charitable programs.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6">2.2 Exceptional Circumstances</h3>
              <p>Refunds may be considered in the following exceptional cases:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Technical Errors:</strong> Double charges due to payment gateway errors</li>
                <li><strong>Unauthorized Transactions:</strong> Fraudulent or unauthorized payments</li>
                <li><strong>System Failures:</strong> Donations charged but not processed due to technical issues</li>
                <li><strong>Duplicate Payments:</strong> Multiple charges for a single intended donation</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              3. Refund Request Process
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800">3.1 How to Request a Refund</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Contact Us Within 7 Days:</strong> Submit your refund request within 7 days of 
                  the transaction date.
                </li>
                <li>
                  <strong>Provide Required Information:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Transaction ID / Payment Reference Number</li>
                    <li>Date and amount of donation</li>
                    <li>Reason for refund request</li>
                    <li>Supporting documentation (if applicable)</li>
                  </ul>
                </li>
                <li>
                  <strong>Submit Request:</strong> Send your request via email or phone using the 
                  contact details provided below.
                </li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">3.2 Processing Timeline</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Review Period:</strong> 5-7 business days to review your request</li>
                <li><strong>Approval Notification:</strong> Email confirmation if refund is approved</li>
                <li><strong>Processing Time:</strong> 7-10 business days for refund to reflect in your account</li>
                <li><strong>Bank Processing:</strong> Additional 2-5 days depending on your bank</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              4. Cancellation Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-800">4.1 Before Payment Completion</h3>
              <p>
                • You can cancel your donation before completing the payment process by simply closing 
                the payment window or navigating away from the page.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800">4.2 After Payment Completion</h3>
              <p>
                • Once payment is successfully processed, the donation cannot be cancelled as it is 
                immediately allocated to our charitable programs.
              </p>
              <p>
                • In case of technical errors during payment, please contact us immediately for assistance.
              </p>
            </div>
          </section>

          {/* Section 5: Payment Gateway Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              5. Payment Gateway Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                • We use <strong>Razorpay</strong> as our secure payment gateway, which complies with 
                RBI guidelines and international security standards.
              </p>
              <p>
                • All payment data is encrypted and secure. We do not store your payment information 
                on our servers.
              </p>
              <p>
                • For payment-related technical issues, you may also contact Razorpay support directly 
                at <a href="https://razorpay.com/support" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  razorpay.com/support
                </a>
              </p>
            </div>
          </section>

          {/* Section 6: Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              6. Contact Us for Refund Requests
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaPhone className="text-blue-600 mr-2" />
                    Phone Support
                  </h3>
                  <p className="text-gray-700">Main: +91 7906891253</p>
                  <p className="text-gray-700">Support: +91 7455908415</p>
                  <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaEnvelope className="text-blue-600 mr-2" />
                    Email Support
                  </h3>
                  <p className="text-gray-700">maequalfoundationtrust@gmail.com</p>
                  <p className="text-sm text-gray-600">Response within 24 business hours</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">For Refund Requests, Please Include:</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Full name and contact details</li>
                  <li>Transaction ID and payment reference</li>
                  <li>Date and amount of donation</li>
                  <li>Detailed reason for refund request</li>
                  <li>Any supporting documents or screenshots</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Legal Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              7. Legal Compliance & Governing Law
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                • This policy is governed by the laws of India and complies with RBI guidelines for 
                online transactions.
              </p>
              <p>
                • M A Equal Foundation is registered under the Societies Registration Act and complies 
                with all applicable NGO regulations.
              </p>
              <p>
                • Any disputes regarding refunds will be subject to the jurisdiction of courts in 
                [Your City], India.
              </p>
            </div>
          </section>

          {/* Section 8: Updates to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
              8. Policy Updates
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                • We reserve the right to update this policy as needed to comply with legal requirements 
                or improve our services.
              </p>
              <p>
                • Any changes will be posted on this page with an updated "Last Modified" date.
              </p>
              <p>
                • Continued use of our donation platform after policy updates constitutes acceptance 
                of the revised terms.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <p className="text-center text-gray-600 text-sm">
            <strong>Thank you for supporting M A Equal Foundation.</strong><br />
            Your donations help us continue our mission to provide quality education and support to those in need.
          </p>
        </div>
      </div>
    </div>
  );
}