import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import About from './pages/About';
import Causes from './pages/Causes';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import DonationSuccessNew from './pages/DonationSuccessNew';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App(){
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donation-success" element={<DonationSuccessNew />} />
            <Route path="/test-success" element={<DonationSuccessNew />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
