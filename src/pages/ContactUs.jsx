import React, { useEffect } from 'react';
import '../Style/Contactus.css';

const ContactPage = () => {
  // Always open from the top when visiting this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  // Google Maps directions function
  const handleGetDirectionsClick = () => {
    // Address for Wahat Al Hijaz Marble and Granite (using your address)
    const address = "123 Luxury Stone Avenue, Marble District, Riyadh 11564, Saudi Arabia";
    
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address);
    
    // Google Maps URL for directions
    const googleMapsUrl = `https://maps.app.goo.gl/b7xtsr35ZP1NZY656?g_st=iwb=${encodedAddress}`;
    
    // Alternative URL that opens directly in Google Maps app or web
    // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Open Google Maps in a new tab
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    
    console.log('Get Directions clicked - Opening Google Maps');
  };

  // Phone call function
  const handleCallUsClick = () => {
    // Phone number for Wahat Al Hijaz Marble and Granite
    const phoneNumber = "+971544992662";
    
    // Create a tel: link
    const telLink = `tel:${phoneNumber}`;
    
    // For mobile devices, this will open the phone dialer
    // For desktop, it may open a calling app or do nothing
    window.location.href = telLink;
    
    console.log('Call Us clicked - Dialing:', phoneNumber);
    
    // Fallback for browsers that don't support tel: links
    setTimeout(() => {
      // Check if the tel link worked (on desktop it might not)
      // You could show a message with the phone number
      if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Desktop device - show phone number
        alert(`Please call us at: ${phoneNumber}`);
      }
    }, 100);
  };

  // Alternative: Use a more robust approach with a button that works on both mobile and desktop
  const handleCallClick = () => {
    const phoneNumber = "+971544992662";
    
    // Check if it's a mobile device
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, use tel: link
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // On desktop, show the number and option to copy
      const shouldCall = window.confirm(
        `Call: ${phoneNumber}\n\nClick OK to copy the number to clipboard, then you can paste it in your phone app.`
      );
      
      if (shouldCall) {
        // Copy to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
          alert(`Phone number ${phoneNumber} copied to clipboard!`);
        }).catch(() => {
          // Fallback if clipboard API fails
          prompt("Copy this phone number:", phoneNumber);
        });
      }
    }
    
    console.log('Call Us clicked');
  };

  // Cal.com embed script - we'll use iframe instead
  const calEmbedUrl = "https://cal.com/wahat-al-hijaz-marble-and-granite/30min";

  return (
    <>
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
                  <p>enquire@wahatalhijamarble.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Call Us</h4>
                  <p> 00971502089689 </p>
                  <p>00971544992662(WhatsApp)</p>
                
                </div>
              </div>
            </div>
            
            <div className="contact-button-container">
              <button
                className="contact-get-directions-btn"
                onClick={handleGetDirectionsClick}
              >
                <span className="contact-btn-dot">•</span>
                <span className="contact-btn-text">Get Directions</span>
              </button>
              <button
                className="contact-call-btn"
                onClick={handleCallClick}
              >
                Call Us Now
              </button>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-container">
            <h2 className="contact-form-title">Request a Free Consultation</h2>
            <p className="contact-form-subtitle">Fill out the form and our marble experts will contact you within 24 hours</p>
            
            <form id="contact-form" action="https://formspree.io/f/xkonaqgz" method="POST">
              <div className="contact-form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required placeholder="Enter your full name" />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />
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