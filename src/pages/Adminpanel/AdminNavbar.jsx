import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../Style/AdminNavbar.css";
import { FaBars } from 'react-icons/fa';
import logo from "../../assets/logoblack.png";

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="petwell-navbar-container">
      {/* Top Bar */}
      <div className="petwell-top-bar">
        <div className="petwell-container-fluid petwell-top-bar-content">
          <div className="petwell-top-bar-left">
            <span className="petwell-email-link">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`petwell-mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Main Navbar */}
      <nav className="petwell-navbar petwell-main-navbar">
        <div className="petwell-container-fluid">
          {/* Mobile Menu Toggle */}
          <button className="petwell-mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FaBars size={24} color="black" />
          </button>

          {/* Brand Logo */}
          <Link className="petwell-navbar-brand" to="/admin" onClick={closeMobileMenu}>
            <div className="petwell-brand-logo">
              <img src={logo} alt="Admin Logo" className="petwell-logo-img" />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="petwell-nav-pill d-none d-lg-flex align-items-center mx-auto">
            <Link className="petwell-nav-link" to="/blogPost" onClick={closeMobileMenu}>Post Blog</Link>
            <Link className="petwell-nav-link" to="/blogTable" onClick={closeMobileMenu}>Manage Blogs</Link>
          </div>

          {/* Right Side: Logout Button */}
          <div className="petwell-right-side-group d-flex align-items-center">
            <button
              className="petwell-btn petwell-logout-btn"
              onClick={() => setShowModal(true)}
              style={{
                background: '#e8e0d8',
                color: '#333',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(232, 224, 216, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 6px 20px rgba(232, 224, 216, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = '#dcd4cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(232, 224, 216, 0.3)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = '#e8e0d8';
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ transition: 'transform 0.3s ease' }}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`petwell-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="petwell-mobile-menu-header">
          <div className="petwell-brand-logo">
            <img src={logo} alt="Admin Logo" className="petwell-logo-img" />
          </div>
          <button className="petwell-mobile-menu-close" onClick={closeMobileMenu}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Links */}
        <div className="petwell-mobile-nav-links">
          <Link className="petwell-mobile-nav-link" to="/blogPost" onClick={closeMobileMenu}>Post Blog</Link>
          <Link className="petwell-mobile-nav-link" to="/blogTable" onClick={closeMobileMenu}>Manage Blogs</Link>
          
          {/* Logout in Mobile */}
          <button
            className="petwell-mobile-nav-link petwell-mobile-logout-btn"
            onClick={() => {
              setShowModal(true);
              closeMobileMenu();
            }}
            style={{
              background: '#e8e0d8',
              color: '#333',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(232, 224, 216, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 6px 20px rgba(232, 224, 216, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.background = '#dcd4cc';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 15px rgba(232, 224, 216, 0.3)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = '#e8e0d8';
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ transition: 'transform 0.3s ease' }}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '5px',
                    border: '1px solid #dee2e6',
                    background: '#f8f9fa',
                    color: '#495057',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f8f9fa';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn deletebtn"
                  onClick={handleLogout}
                  style={{
                    background: '#e8e0d8',
                    color: '#333',
                    border: 'none',
                    padding: '8px 24px',
                    borderRadius: '5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(232, 224, 216, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 6px 20px rgba(232, 224, 216, 0.5)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.background = '#dcd4cc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 4px 15px rgba(232, 224, 216, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = '#e8e0d8';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;