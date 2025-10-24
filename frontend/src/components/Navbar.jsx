import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClassName = (path) => {
    return `font-semibold px-3 py-2 relative transition-all duration-300 ${
      isActive(path)
        ? 'text-blue-600 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:left-0 after:bottom-0 after:shadow-[0_0_10px_1px_rgba(37,99,235,0.5)] after:animate-pulse'
        : 'text-gray-600 hover:text-blue-600 hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:left-0 hover:after:bottom-0 hover:after:transition-all hover:after:duration-300'
    }`;
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mr-[10px] px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl text-blue-600">
          <div className="flex items-center">
            <img src={logo} alt="M A Equal Foundation Logo" className='w-[60px] h-[60px] object-contain'/>
            <div className="flex flex-col ml-4">
              <span className="text-xl font-bold text-blue-700 leading-tight">M A EQUAL</span>
              <span className="text-lg font-semibold text-green-600 leading-tight">FOUNDATION</span>
            </div>
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-2">
          <Link to="/" className={getLinkClassName('/')}>
            Home
          </Link>
          <Link to="/about" className={getLinkClassName('/about')}>
            About
          </Link>
          <Link to="/causes" className={getLinkClassName('/causes')}>
            Causes
          </Link>
          <Link to="/volunteer" className={getLinkClassName('/volunteer')}>
            Volunteer
          </Link>
          <Link to="/contact" className={getLinkClassName('/contact')}>
            Contact
          </Link>
          <Link
            to="/donate"
            className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:from-blue-500 hover:to-blue-600 transform transition-all duration-300 ease-in-out animate-pulse-subtle"
          >
            🤝 Donate Now
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4">
            <Link 
              to="/" 
              className={`block ${getLinkClassName('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block ${getLinkClassName('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/causes" 
              className={`block ${getLinkClassName('/causes')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Causes
            </Link>
            <Link 
              to="/volunteer" 
              className={`block ${getLinkClassName('/volunteer')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Volunteer
            </Link>
            <Link 
              to="/contact" 
              className={`block ${getLinkClassName('/contact')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/donate"
              className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:from-blue-500 hover:to-blue-600 transform transition-all duration-300 ease-in-out animate-pulse-subtle"
              onClick={() => setIsMenuOpen(false)}
            >
              🤝 Donate Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
