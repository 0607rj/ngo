import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Use Formspree directly - no backend needed!
      const response = await fetch('https://formspree.io/f/xdkwwdzb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
          _replyto: formData.email, // This tells Formspree to use this as reply-to
          _subject: `New Contact: ${formData.subject || "No Subject"}` // Custom subject line
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '✅ Message sent successfully! We will get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(`Formspree error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ An error occurred. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
        <div className="absolute inset-0">
          {/* Animated shapes */}
          <div className="absolute w-64 h-64 -top-32 left-1/4 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute w-64 h-64 top-1/3 -right-32 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="space-y-6">
            <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
              <FaEnvelope className="text-4xl text-yellow-300" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              Contact Us
              <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                MA Equal Foundation
              </span>
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto text-blue-100">
              Have questions about our programs? Want to get involved or make a donation?
              We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Cards */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-900">Phone</h3>
            <p className="text-gray-600 mb-1">Main: +91 7906891253</p>
            <p className="text-gray-600">Support: +91 7455908415</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Available Monday - Friday<br />9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-900">Email</h3>
            <p className="text-gray-600 mb-1">maequalfoundationtrust@gmail.com</p>
            <p className="text-gray-600">Contact us anytime</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                We typically respond within<br />24 business hours
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-900">Location</h3>
            <p className="text-gray-600 mb-1">Chandausi road Near maulana khurshid Saif khan Sarai</p>
            <p className="text-gray-600">Sambhal, 244302 Uttar Pradesh, India</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Visit us during office hours<br />
                Map & Directions available
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full mr-4">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900">Send us a Message</h2>
            </div>

            {/* Status Message */}
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg p-4 h-[300px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.041!2d78.5511!3d28.5816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b1f5a1a1a1a1a%3A0xa1a1a1a1a1a1a1a1!2sChandausi%20Rd%2C%20Sambhal%2C%20Uttar%20Pradesh%20244302%2C%20India!5e0!3m2!1sen!2sin!4v1697234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FaClock className="text-blue-600 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Office Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-800">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-800">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-800">Closed</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FaWhatsapp className="text-green-600 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">WhatsApp Contact</h3>
              </div>
              <p className="text-gray-600">
                Connect with us on WhatsApp for quick responses:
              </p>
              <a 
                href="https://wa.me/917906891253" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 font-semibold text-lg mt-2 hover:text-green-700 transition-colors duration-200 block"
              >
                +91 7906891253
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How can I volunteer?</h3>
              <p className="text-gray-600">
                You can join our volunteer program by filling out the volunteer form on our website or contacting our volunteer coordinator directly.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How are donations used?</h3>
              <p className="text-gray-600">
                100% of your donations go directly to our programs. We maintain complete transparency in our financial reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;