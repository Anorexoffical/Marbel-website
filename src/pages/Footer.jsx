import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Footer.css";
import footervideo from "../assets/mablefooter.webp";
import certificate from '../assets/companydoc/certificate.png';
import license from '../assets/companydoc/license1.png';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { IoClose, IoDocumentText, IoLockClosed } from "react-icons/io5";

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // WhatsApp order link
  const whatsappNumber = "971544992662"; // Country code + number, no '+' or leading zeros
  const whatsappMsg = "Hello WAHAT AL HIJAZ MARBLE, I’d like to place an order.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  // Handle body scroll when modal is open
  useEffect(() => {
    if (showPrivacyModal || showDocsModal || showTermsModal) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showPrivacyModal, showDocsModal, showTermsModal]);

  return (
    <>
      <footer className="footer-section">
        {/* Background image area */}
        <div className="footer-hero d-flex align-items-center justify-content-center">
          <img
            className="footer-video-bg"
            src={footervideo}
            alt="Footer background"
            loading="eager"
          />
          
          <div className="video-overlay cta-overlay" />
          
          <div className="footer-hero-content text-center text-white">
            <h1 className="footer-hero-title">
              Transform Your Space
            </h1>
            <p className="footer-hero-subtitle">
              Get premium marble, granite, and stone solutions delivered to your doorstep within 48 hours.
            </p>
            <div className="d-flex justify-content-center">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-transparent btn-lg rounded-pill px-5 py-2 fw-medium"
                aria-label="Order now via WhatsApp"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>

        {/* Footer content */}
        <div className="footer-main">
          <div className="container">
            {/* Top row with logo centered */}
            <div className="row justify-content-center py-4">
              <div className="col-12 text-center">
                <div className="footer-logo-wrapper">
                  {/* <img 
                    src={logo} 
                    alt="Wahat Al Hijaz Marble" 
                    className="footer-logo-img"
                    loading="lazy"
                  /> */}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="row py-5">
              {/* Left column */}
              <div className="col-lg-4 col-md-6 mb-4">
                <h6 className="footer-heading">About Us</h6>
                <p className="footer-text mb-4">
                  Premium natural stone solutions for modern homes and commercial spaces, bringing timeless elegance to every project since 2017.
                </p>
                
                {/* Quick Links */}
                <div className="quick-links mb-4">
                  <button 
                    className="btn btn-quick-link me-3 mb-2"
                    onClick={() => setShowPrivacyModal(true)}
                  >
                    <IoLockClosed size={16} className="me-2" />
                    Privacy Policy
                  </button>
                  <button 
                    className="btn btn-quick-link mb-2"
                    onClick={() => setShowDocsModal(true)}
                  >
                    <IoDocumentText size={16} className="me-2" />
                    View Documents
                  </button>
                </div>

                {/* Newsletter removed per request */}
              </div>

              {/* Middle column - Services */}
              <div className="col-lg-2 col-md-3 mb-4">
                <h6 className="footer-heading">Services</h6>
                <ul className="list-unstyled footer-links">
                  <li><Link to="/marble">Marble</Link></li>
                  <li><Link to="/granite">Granite</Link></li>
                  <li><Link to="/travertine">Travertine</Link></li>
                  <li><Link to="/ceramic">Ceramic</Link></li>
                  <li><Link to="/quartz">Quartz</Link></li>
                  <li><Link to="/mosaic">Mosaic</Link></li>
                </ul>
              </div>

              {/* Middle column - Company */}
              <div className="col-lg-2 col-md-3 mb-4">
                <h6 className="footer-heading">Company</h6>
                <ul className="list-unstyled footer-links">
                  {/* <li><Link to="/about-us">About Us</Link></li> */}
                  <li><Link to="/blog">Blogs</Link></li>
                  <li><Link to="/our-recent-projects">Recent Projects</Link></li>
                  <li>
                    <button 
                      className="policy-link text-start p-0 border-0 bg-transparent text-white"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      className="policy-link text-start p-0 border-0 bg-transparent text-white"
                      onClick={() => setShowDocsModal(true)}
                    >
                      Company Documents
                    </button>
                  </li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
              </div>

              {/* Right column - Contact & Social */}
              <div className="col-lg-4 col-md-6 mb-4">
                <h6 className="footer-heading">Contact Info</h6>
                <div className="contact-info mb-4">
                  <p className="footer-text mb-2">
                    <strong>Address:</strong> 
                    Industrial Area 15, Sharjah, UAE
                  </p>
                  <p className="footer-text mb-2">
                    <strong>Phone:</strong> 00971544992662
                  </p>
                  <p className="footer-text mb-3">
                    <strong>Email:</strong> info@wahatalhijamarble.com
                  </p>
                  
                  <div className="business-hours">
                    <h6 className="footer-heading mb-2">Business Hours</h6>
                    <p className="footer-text mb-1"></p>
                    <p className="footer-text mb-1">Monday - Saturday: 
                      7:00 AM - 1:00 PM,
                      2:00 PM - 6:00 PM</p>
                    <p className="footer-text">Sunday: closed</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-section">
                  <div className="footer-social">
                    <a href="https://www.facebook.com/share/1C5Upk4MzR/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                      <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/wahat_al_hijaz?igsh=MXUxN2NsNXNvM2Z0aQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                      <FaInstagram />
                    </a>
                    <a href="https://vt.tiktok.com/ZS5taqeff/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
                      <FaTiktok />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="row border-top border-light pt-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <small className="footer-copy">
                  © 2025 WAHAT AL HIJAZ MARBLE. All Rights Reserved.
                </small>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="footer-bottom-links">
                  <button 
                    className="btn btn-link footer-bottom-link"
                    onClick={() => setShowPrivacyModal(true)}
                  >
                    Privacy Policy
                  </button>
                  <span className="text-light mx-2">•</span>
                  <button 
                    className="btn btn-link footer-bottom-link"
                    onClick={() => setShowDocsModal(true)}
                  >
                    Company Documents
                  </button>
                  <span className="text-light mx-2">•</span>
                  <button 
                    className="btn btn-link footer-bottom-link"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="footer-marquee-wrapper mt-4">
            <div className="footer-marquee">
              <span>Premium Quality • Custom Designs • Fast Delivery </span>
              <span>Premium Quality • Custom Designs • Fast Delivery </span>
              <span>Premium Quality • Custom Designs • Fast Delivery </span>
              <span>Premium Quality • Custom Designs • Fast Delivery </span>
              <span>Premium Quality • Custom Designs • Fast Delivery </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="footer-modal-overlay" onClick={() => setShowPrivacyModal(false)}>
          <div className="footer-modal-content footer-policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div className="d-flex align-items-center gap-3">
                <div className="footer-modal-icon">
                  <IoLockClosed size={24} />
                </div>
                <div>
                  <h2 className="footer-modal-title">Privacy Policy</h2>
                </div>
              </div>
              <button 
                className="footer-modal-close"
                onClick={() => setShowPrivacyModal(false)}
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="footer-modal-body">
              <div className="footer-policy-content">
                <h3 className="footer-policy-main-title">Our Privacy Commitment</h3>
                <p className="footer-policy-text">
                  At WAHAT AL HIJAZ MARBLE & GRANITE CUTTING. LLC. SP, we are committed to protecting your privacy and personal information.
                </p>

                <h4 className="footer-policy-subtitle">Information We Collect</h4>
                <p className="footer-policy-text">We only collect information necessary to provide our services:</p>
                <ul className="footer-policy-list">
                  <li className="footer-policy-list-item">Contact information (name, email, phone)</li>
                  <li className="footer-policy-list-item">Project details and requirements</li>
                  <li className="footer-policy-list-item">Communication history</li>
                </ul>

                <h4 className="footer-policy-subtitle">How We Use Your Information</h4>
                <ul className="footer-policy-list">
                  <li className="footer-policy-list-item">To provide our marble and granite services</li>
                  <li className="footer-policy-list-item">To communicate about your project</li>
                  <li className="footer-policy-list-item">To process your orders</li>
                  <li className="footer-policy-list-item">To improve our services</li>
                </ul>

                <h4 className="footer-policy-subtitle">Data Security</h4>
                <p className="footer-policy-text">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
                </p>

                <h4 className="footer-policy-subtitle">Information Sharing</h4>
                <p className="footer-policy-text">
                  We do not sell, trade, or rent your personal information to third parties. We only share information when required by law or to fulfill our services.
                </p>

                <h4 className="footer-policy-subtitle">Your Rights</h4>
                <p className="footer-policy-text">You have the right to:</p>
                <ul className="footer-policy-list">
                  <li className="footer-policy-list-item">Access your personal information</li>
                  <li className="footer-policy-list-item">Correct inaccurate information</li>
                  <li className="footer-policy-list-item">Request deletion of your information</li>
                  <li className="footer-policy-list-item">Opt-out of marketing communications</li>
                </ul>

                <h4 className="footer-policy-subtitle">Contact Us</h4>
                <p className="footer-policy-text">
                  For privacy-related questions or concerns, contact us at:<br/>
                  <strong>Email:</strong> info@wahatalhijamarble.com<br/>
                  <strong>Phone:</strong> 00971544992662
                </p>

                <div className="footer-policy-note">
                  <p className="footer-policy-text">
                    <strong>Last Updated:</strong> january 2026<br/>
                    This policy may be updated periodically. Please check back for changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="footer-modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="footer-modal-content footer-policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div className="d-flex align-items-center gap-3">
                <div className="footer-modal-icon">
                  <IoDocumentText size={24} />
                </div>
                <div>
                  <h2 className="footer-modal-title">Terms & Conditions</h2>
                </div>
              </div>
              <button 
                className="footer-modal-close"
                onClick={() => setShowTermsModal(false)}
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="footer-modal-body">
              <div className="footer-policy-content">
                <h3 className="footer-policy-main-title">Terms & Conditions</h3>
                
                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">1. Delivery Time</h4>
                  <p className="footer-policy-text">
                    Delivery timeframes will be discussed and agreed upon prior to order confirmation. We strive for timely delivery but are not responsible for delays caused by third parties.
                  </p>
                </div>

                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">2. Quotation Validity</h4>
                  <p className="footer-policy-text">
                    This quotation is valid until stock lasts. Prices and availability are subject to change without notice.
                  </p>
                </div>

                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">3. Return and Exchange Policy</h4>
                  <p className="footer-policy-text mainword">PLEASE INSPECT THE MATERIAL AT YOUR END. ONCE LOADED, MATERIAL SHALL NOT BE RETURNED BACK OR EXCHANGED.</p>
                  <p className="footer-policy-text">
                    Custom orders and fabricated materials cannot be returned or exchanged.
                  </p>
                </div>

                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">4. Payment Terms</h4>
                  <p className="footer-policy-text">
                    <strong>15 days PDC cheque on delivery.</strong> All payments are due upon delivery unless otherwise agreed in writing.
                  </p>
                  <p className="footer-policy-text">
                    <strong>Payment Method:</strong> Cheques to be made in the name of <strong>"WAHAT AL HIJAZ MARBLE & GRANITE CUTTING. LLC. SP"</strong>
                  </p>
                </div>

                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">5. Natural Stone Characteristics</h4>
                  <p className="footer-policy-text">
                    Granite and marble being natural products are bound to have variations in color and patterns. Veins, surface cracks, and fissures are natural characteristics of stones and are unavoidable. These features do not constitute defects.
                  </p>
                </div>

                <div className="footer-policy-section">
                  <h4 className="footer-policy-subtitle">6. Contact Information</h4>
                  <p className="footer-policy-text">
                    <strong>WAHAT AL HIJAZ MARBLE & GRANITE CUTTING. LLC. SP</strong><br/>
                    <strong>Email:</strong>info@wahatalhijamarble.com<br/>
                    <strong>Phone:</strong> 009715449926622<br/>
                    <strong>Address:</strong> Industrial Area 15, Sharjah, UAE
                  </p>
                </div>

                <div className="footer-policy-note">
                  <p className="footer-policy-text">
                    <strong>Last Updated:</strong> : january 2026 <br/>
                    This document supersedes all prior agreements and understandings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Documents Modal */}
      {showDocsModal && (
        <div className="footer-modal-overlay" onClick={() => setShowDocsModal(false)}>
          <div className="footer-modal-content footer-docs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div className="d-flex align-items-center gap-3">
                <div className="footer-modal-icon">
                  <IoDocumentText size={24} />
                </div>
                <div>
                  <h2 className="footer-modal-title">Company Documents</h2>
                </div>
              </div>
              <button 
                className="footer-modal-close"
                onClick={() => setShowDocsModal(false)}
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="footer-modal-body">
              <div className="footer-docs-content">
                <div className="footer-docs-grid">
                  <div className="footer-doc-item">
                    <div className="footer-doc-header">
                      <h4 className="footer-doc-title">Chamber of Commerce Certificate</h4>
                      <p className="footer-doc-subtitle">Certificate of Appreciation</p>
                    </div>
                    <div className="footer-doc-image-container">
                      <img 
                        src={certificate} 
                        alt="Chamber of Commerce Certificate" 
                        className="footer-doc-image"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="footer-doc-item">
                    <div className="footer-doc-header">
                      <h4 className="footer-doc-title">Industrial & Trade License</h4>
                      <p className="footer-doc-subtitle">Official Business License</p>
                    </div>
                    <div className="footer-doc-image-container">
                      <img 
                        src={license} 
                        alt="Industrial and Trade License" 
                        className="footer-doc-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;