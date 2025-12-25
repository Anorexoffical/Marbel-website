// FooterSection.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Footer.css";
import footervideo from "../assets/footervedio.mp4";

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Background video area - Full height with overlay */}
      <div className="footer-hero d-flex align-items-center justify-content-center">
        {/* Background Video - High Quality */}
        <video 
          className="footer-video-bg"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
        >
          <source src={footervideo} type="video/mp4" />
          {/* Fallback for browsers that don't support MP4 */}
          Your browser does not support the video tag.
        </video>
        
        {/* Color mixing overlay */}
        <div className="video-overlay cta-overlay" />
        
        <div className="footer-hero-content text-center text-white">
          <h1 className="footer-hero-title">
            Don&apos;t wait for symptoms,<br />they appear too late.
          </h1>
          <p className="footer-hero-subtitle">
            Order your kit now and get peace of mind in just 48 hours.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn btn-light btn-lg rounded-pill px-5 py-2 fw-medium">
              Join Now
            </button>
            <button className="btn btn-outline-light btn-lg rounded-pill px-5 py-2 fw-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Dark info area */}
      <div className="footer-main">
        <div className="container">
          <div className="row align-items-start py-5">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="footer-logo">petwell</div>
              <p className="footer-text">
                Preventive health testing for pets, because they can&apos;t tell
                us when something is wrong, but their biomarkers can.
              </p>
              <form className="footer-form d-flex">
                <input
                  type="email"
                  className="form-control form-control-sm me-2"
                  placeholder="Your email address"
                />
                <button className="btn btn-outline-light btn-sm" type="submit">
                  →
                </button>
              </form>
              <small className="footer-note">
                Your information is never disclosed to third parties.
              </small>
            </div>

            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="footer-heading">Product</h6>
              <ul className="list-unstyled footer-links">
                <li>How It Works</li>
                <li>Pricing</li>
                <li>Our Tests</li>
                <li>Sample Results</li>
              </ul>
            </div>

            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="footer-heading">Company</h6>
              <ul className="list-unstyled footer-links">
                <li>Our Story</li>
                <li>Partners</li>
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
            </div>

            <div className="col-md-4 text-md-end">
              <small className="footer-copy">
                PETWELL INC. 2025. All Rights Reserved.
              </small>
              <div className="footer-social mt-3">
                <span className="social-dot" />
                <span className="social-dot" />
                <span className="social-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* marquee text */}
        <div className="footer-marquee-wrapper">
          <div className="footer-marquee">
            <span>happy, healthy, &amp; loved. </span>
            <span>happy, healthy, &amp; loved. </span>
            <span>happy, healthy, &amp; loved. </span>
            <span>happy, healthy, &amp; loved. </span>
            <span>happy, healthy, &amp; loved. </span>
            <span>happy, healthy, &amp; loved. </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;