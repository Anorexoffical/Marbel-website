import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="petwell-navbar-container">
      {/* Free Shipping Banner */}
      <div className="petwell-free-shipping-banner text-center py-2">
        <span className="petwell-free-shipping-text">Free shipping on orders over $50</span>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`petwell-mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Main Navbar */}
      <nav className="petwell-navbar navbar-expand-lg petwell-main-navbar">
        <div className="petwell-container-fluid">
          {/* Mobile Menu Toggle - Three Dashes */}
          <button className="petwell-mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className="petwell-three-dashes">
              <div className="petwell-dash"></div>
              <div className="petwell-dash"></div>
              <div className="petwell-dash"></div>
            </div>
          </button>

          {/* Brand Logo */}
          <Link className="petwell-navbar-brand" to="/" onClick={closeMobileMenu}>
            <div className="petwell-brand-logo">
              <img src={logo} alt="Petwell Logo" className="petwell-logo-img" />
            </div>
          </Link>

          {/* Navigation Links (centered pill) - Hidden on mobile */}
          <div className="petwell-nav-pill rounded-pill d-none d-xxl-flex align-items-center mx-auto">
            <Link className="petwell-nav-link" to="/">Home</Link>
            <Link className="petwell-nav-link" to="/marble">Marble</Link>
            <Link className="petwell-nav-link" to="/granite-onyx">Granite Onyx</Link>
            <Link className="petwell-nav-link" to="/travertine">Travertine</Link>
            <Link className="petwell-nav-link" to="/ceramic">Ceramic</Link>
            <Link className="petwell-nav-link" to="/quartz">Quartz</Link>
            <Link className="petwell-nav-link" to="/contact-us">Contact Us</Link>
            <Link className="petwell-nav-link" to="/our-recent-projects">Our Recent Projects</Link>
          </div>

          {/* Right Side Items - Get Started button only */}
          <div className="petwell-navbar-right-items d-flex align-items-center">
            {/* Get Started Button - Visible on desktop only */}
            <button className="petwell-btn petwell-get-started-btn d-none d-xxl-flex">
              <span className="petwell-btn-dot">•</span>
              <span className="petwell-btn-text">WhatsApp</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Contains all navigation items */}
      <div className={`petwell-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="petwell-mobile-menu-header">
          <div className="petwell-brand-logo">
            <img src={logo} alt="Petwell Logo" className="petwell-logo-img" />
          </div>
          <button className="petwell-mobile-menu-close" onClick={closeMobileMenu}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Links - Includes all navigation items */}
        <div className="petwell-mobile-nav-links">
          <Link className="petwell-mobile-nav-link" to="/" onClick={closeMobileMenu}>Home</Link>
          <Link className="petwell-mobile-nav-link" to="/marble" onClick={closeMobileMenu}>Marble</Link>
          <Link className="petwell-mobile-nav-link" to="/granite-onyx" onClick={closeMobileMenu}>Granite Onyx</Link>
          <Link className="petwell-mobile-nav-link" to="/travertine" onClick={closeMobileMenu}>Travertine</Link>
          <Link className="petwell-mobile-nav-link" to="/ceramic" onClick={closeMobileMenu}>Ceramic</Link>
          <Link className="petwell-mobile-nav-link" to="/quartz" onClick={closeMobileMenu}>Quartz</Link>
          <Link className="petwell-mobile-nav-link" to="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>
          <Link className="petwell-mobile-nav-link" to="/our-recent-projects" onClick={closeMobileMenu}>Our Recent Projects</Link>
        </div>
        
        {/* Get Started Button in Mobile Menu */}
        <button className="petwell-btn petwell-get-started-btn w-100" onClick={closeMobileMenu}>
          <span className="petwell-btn-dot">•</span>
          <span className="petwell-btn-text">Get Started</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;