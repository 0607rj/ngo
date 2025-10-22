import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import nav from '../assets/nav.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {/* Organization Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <img src={nav} alt="NGO Logo" className=" w-[150px] h-[47px] ml-[10px]" />
              <h3 className="text-white text-xl font-bold"></h3>
            </div>
            <p className="text-sm px-4 sm:px-0">
              MA Equal Foundation - Empowering communities through education, 
              social welfare, and sustainable development initiatives.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-6 pt-4 justify-center sm:justify-start">
              <a href="https://www.facebook.com/share/1BU4hsSJpF/" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/maequalfoundation?igsh=b2hmaTBzYnJqeWR3" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-600 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://youtube.com/@amirqidwai146?si=C_QTrYScVGctM2ym" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/causes" className="hover:text-blue-400 transition-colors">
                  Our Causes
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-blue-400 transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-blue-400 transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">
                  Chandausi road, Saif khan Sarai<br />
                  Sambhal, 244302 Uttar Pradesh, India
                </p>
              </div>
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">+91 7906891253, +91 7455908415</p>
              </div>
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">maequalfoundationtrust@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3 justify-center sm:justify-start">
                <FaWhatsapp className="text-green-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/917906891253" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  +91 7906891253
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} MA Equal Foundation. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;