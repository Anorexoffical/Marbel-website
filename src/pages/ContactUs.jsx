import React from 'react';
import '../Style/Contactus.css';
import Navbar from './Navbar';

const ContactPage = () => {
  const handleGetDirectionsClick = () => {
    // Handle Get Directions button click
    console.log('Get Directions clicked');
    // Add your map/directions logic here
  };

  const handleCallUsClick = () => {
    // Handle Call Us button click
    console.log('Call Us clicked');
    // Add your call functionality here
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted');
    // Add your form submission logic here
  };

  // Cal.com embed script - we'll use iframe instead
  const calEmbedUrl = "https://cal.com/icellmobileweb-gmail.com/30min";

  return (
    <>
      <Navbar />
      <div className="contactpage-wrapper">
        {/* Main Contact Container */}
        <div className="main-contact-container">
          {/* Contact Content */}
          <div className="contact-content-wrap">
            <div className="contact-content-treatment">Get in Touch</div>
            <div className="contact-main-title">
              Visit Our Showroom
              <br />
              or Request a Consultation
            </div>
            <div className="contact-main-subtitle">
              Experience luxury stone surfaces firsthand at our showroom. Our experts are ready to help you select the perfect marble, granite, or quartz for your project. Schedule a visit or request a virtual consultation today.
            </div>
            
            {/* Contact Info Section */}
            <div className="contact-info-section">
              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Our Location</h4>
                  <p>123 Luxury Stone Avenue</p>
                  <p>Marble District, Riyadh 11564</p>
                  <p>Saudi Arabia</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email Us</h4>
                  <p>contact@wahatalhijazmarble.com</p>
                  <p>sales@wahatalhijazmarble.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Call Us</h4>
                  <p>+966 11 234 5678</p>
                  <p>+966 55 123 4567 (WhatsApp)</p>
                </div>
              </div>
            </div>
            
            <div className="d-flex align-items-center contact-button-container">
              <button
                className="contact-get-directions-btn"
                onClick={handleGetDirectionsClick}
              >
                <span className="contact-btn-dot">•</span>
                <span className="contact-btn-text">Get Directions</span>
              </button>
              <button
                className="contact-call-btn"
                onClick={handleCallUsClick}
              >
                Call Us Now
              </button>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-container">
            <h2 className="contact-form-title">Request a Free Consultation</h2>
            <p className="contact-form-subtitle">Fill out the form and our marble experts will contact you within 24 hours</p>
            
            <form id="contact-form" onSubmit={handleFormSubmit}>
              <div className="contact-form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required placeholder="Enter your full name" />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="project-type">Project Type *</label>
                <select id="project-type" name="project-type" required>
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="kitchen">Kitchen Renovation</option>
                  <option value="bathroom">Bathroom Renovation</option>
                  <option value="flooring">Flooring</option>
                  <option value="countertops">Countertops</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="stone-type">Stone Type Interested In</label>
                <select id="stone-type" name="stone-type">
                  <option value="">Select stone type (optional)</option>
                  <option value="marble">Marble</option>
                  <option value="granite">Granite</option>
                  <option value="quartz">Quartz</option>
                  <option value="travertine">Travertine</option>
                  <option value="onyx">Onyx</option>
                  <option value="limestone">Limestone</option>
                </select>
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="Tell us about your project, dimensions, and timeline..."
                ></textarea>
              </div>
              
              <button type="submit" className="contact-submit-btn">Request Free Consultation</button>
            </form>
          </div>
        </div>

        {/* Booking Section - Using iframe for Cal.com */}
        <div className="booking-section">
          <div className="booking-container">
            <h1 className="booking-heading">BOOK A MEETING</h1>
            <div className="booking-wrapper">
              <div className="calendar-embed-container">
                <iframe 
                  src={calEmbedUrl} 
                  title="Book a Meeting"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '20px'
                  }}
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;