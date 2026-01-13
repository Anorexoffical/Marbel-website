import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactFlagsSelect from 'react-flags-select';
import '../Style/Navbar.css';
import logo from "../assets/logoblack.webp";

// Import stone images
import marbleImg from "../assets/service1.webp";
import graniteImg from "../assets/service2.webp";
import travertineImg from "../assets/service3.webp";
import ceramicImg from "../assets/service4.webp";
import quartzImg from "../assets/service5.webp";
import limestoneImg from "../assets/service6.webp";

const Navbar = ({ scrollToAboutUs }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('US');
  const [loadedImages, setLoadedImages] = useState({});
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const imageRefs = useRef({});
  const location = useLocation();

  // Stone collection data with images
  const stoneCollections = [
    { id: 1, name: "Marble", path: "/marble", image: marbleImg },
    { id: 2, name: "Granite Onyx", path: "/granite", image: graniteImg },
    { id: 3, name: "Travertine", path: "/travertine", image: travertineImg },
    { id: 4, name: "Ceramic", path: "/ceramic", image: ceramicImg },
    { id: 5, name: "Quartz", path: "/quartz", image: quartzImg },
    { id: 6, name: "Mosaic", path: "/mosaic", image: limestoneImg },
  ];

  // Split into two rows of 3 items each for desktop
  const row1 = stoneCollections.slice(0, 3);
  const row2 = stoneCollections.slice(3, 6);

  // Handle image load
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Initialize Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    // Observe all lazy images
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileServicesOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleEmailClick = () => {
    window.open('mailto:enquire@wahatalhijamarble.com', '_blank');
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMobileServicesDropdown = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  const handleWhatsAppClick = () => {
    // Pre-filled message for WhatsApp
    const message = encodeURIComponent(
      "Hello WAHAT AL HIJA MARBLE,\n\n" +
      "I'm interested in your marble and granite services. " 
    );
    
    window.open(`https://wa.me/+971544992662?text=${message}`, '_blank');
  };

  const handleLanguageSelect = (countryCode) => {
    setSelectedLanguage(countryCode);
  };

  // Handle About Us click - scroll on homepage, navigate on other pages
  const handleAboutUsClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    
    if (location.pathname === '/' && scrollToAboutUs) {
      // If on homepage and scrollToAboutUs function is provided, scroll to about section
      scrollToAboutUs();
    } else {
      // If on other pages, navigate to homepage with hash
      window.location.href = '/#about';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="petwell-navbar-container">
      {/* Top Bar with Email and Social Media */}
      <div className="petwell-top-bar">
        <div className="petwell-container-fluid petwell-top-bar-content">
          <div className="petwell-top-bar-left">
            <a 
              href="enquire@wahatalhijamarble.com" 
              className="petwell-email-link"
              onClick={(e) => {
                e.preventDefault();
                handleEmailClick();
              }}
            >
              enquire@wahatalhijamarble.com
            </a>
          </div>

          <div className="petwell-social-icons">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="petwell-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="petwell-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="petwell-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3.012.599.066.89.16v-3.41a6.34 6.34 0 0 0-5.9 6.28 6.34 6.34 0 0 0 11.17 4.21 6.34 6.34 0 0 0 .53-9.03v-5a7.72 7.72 0 0 0 4.29 1.86v3.18a4.67 4.67 0 0 1-3.48-1.46z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`petwell-mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Main Navbar */}
      <nav className="petwell-navbar navbar-expand-lg petwell-main-navbar">
        <div className="petwell-container-fluid">
          {/* Mobile Menu Toggle */}
          <button className="petwell-mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className="petwell-three-dashes">
              <div className="petwell-dash"></div>
              <div className="petwell-dash"></div>
              <div className="petwell-dash"></div>
            </div>
          </button>

          {/* Brand Logo - Will be hidden below 435px */}
          <Link className="petwell-navbar-brand" to="/" onClick={closeMobileMenu}>
            <div className="petwell-brand-logo">
              <img 
                src={logo} 
                alt="Petwell Logo" 
                className="petwell-logo-img" 
                loading="eager" // Keep logo eager loaded for immediate visibility
              />
            </div>
          </Link>

          {/* Navigation Links (centered pill) */}
          <div className="petwell-nav-pill rounded-pill d-none d-xxl-flex align-items-center mx-auto">
            <Link className="petwell-nav-link" to="/" onClick={closeMobileMenu}>Home</Link>
            
            {/* About Us Link - Updated to handle scroll/navigation */}
            <a 
              className="petwell-nav-link" 
              href="#about"
              onClick={handleAboutUsClick}
            >
              About Us
            </a>
            
            {/* Services Dropdown */}
            <div className="petwell-nav-dropdown" ref={dropdownRef}>
              <div className="petwell-dropdown-wrapper">
                <Link 
                  className="petwell-nav-link petwell-dropdown-main-link"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleServicesDropdown();
                  }}
                >
                  Stone Collection
                  <svg 
                    className={`petwell-dropdown-arrow ${isServicesOpen ? 'open' : ''}`} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </Link>
                
                {/* Enhanced Services Dropdown Menu with 3x3 Layout */}
                <div className={`petwell-dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                  <div className="petwell-dropdown-content">
                    {/* First Row - 3 items */}
                    <div className="petwell-stone-row">
                      {row1.map((stone) => (
                        <Link 
                          key={stone.id} 
                          className="petwell-stone-item" 
                          to={stone.path} 
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="petwell-stone-content">
                            <div className="petwell-stone-image-wrapper">
                              <img 
                                ref={el => imageRefs.current[stone.id] = el}
                                src={isServicesOpen ? stone.image : null} // Avoid empty src when closed
                                data-src={stone.image}
                                alt={stone.name} 
                                className={`petwell-stone-image ${loadedImages[stone.id] ? 'loaded' : 'loading'}`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(stone.id)}
                              />
                            </div>
                            <div className="petwell-stone-text">
                              <div className="petwell-stone-name">{stone.name}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Second Row - 3 items */}
                    <div className="petwell-stone-row">
                      {row2.map((stone) => (
                        <Link 
                          key={stone.id} 
                          className="petwell-stone-item" 
                          to={stone.path} 
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="petwell-stone-content">
                            <div className="petwell-stone-image-wrapper">
                              <img 
                                ref={el => imageRefs.current[stone.id] = el}
                                src={isServicesOpen ? stone.image : null} // Avoid empty src when closed
                                data-src={stone.image}
                                alt={stone.name} 
                                className={`petwell-stone-image ${loadedImages[stone.id] ? 'loaded' : 'loading'}`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(stone.id)}
                              />
                            </div>
                            <div className="petwell-stone-text">
                              <div className="petwell-stone-name">{stone.name}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link className="petwell-nav-link" to="/blog" onClick={closeMobileMenu}>Blog</Link>
            <Link className="petwell-nav-link" to="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>
            <Link className="petwell-nav-link" to="/our-recent-projects" onClick={closeMobileMenu}>Recent Projects</Link>
          </div>

          {/* RIGHT SIDE GROUP: Language Selector + WhatsApp Button */}
          <div className="petwell-right-side-group d-flex align-items-center">
            {/* Language Selector - Always visible */}
            <div className="petwell-language-selector-wrapper" ref={languageDropdownRef}>
              <ReactFlagsSelect
                selected={selectedLanguage}
                onSelect={handleLanguageSelect}
                countries={["US", "SA"]}
                customLabels={{
                  "US": { primary: "English", secondary: "" },
                  "SA": { primary: "العربية", secondary: "" }
                }}
                placeholder="Select Language"
                className="petwell-language-selector"
                selectButtonClassName="petwell-language-select-button"
                optionsClassName="petwell-language-options"
                showSelectedLabel={true}
                showSecondarySelectedLabel={false}
                selectedSize={16}
                optionsSize={14}
                fullWidth={false}
                alignOptionsToRight={true}
              />
            </div>

            {/* WhatsApp Button - Only on desktop, hidden on mobile */}
            <button 
              className="petwell-btn petwell-get-started-btn d-none d-md-flex"
              onClick={handleWhatsAppClick}
            >
              <span className="petwell-btn-dot">•</span>
              <span className="petwell-btn-text">WhatsApp</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`petwell-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="petwell-mobile-menu-header">
          <div className="petwell-brand-logo">
            <img 
              src={logo} 
              alt="Petwell Logo" 
              className="petwell-logo-img" 
              loading="eager" 
            />
          </div>
          <button className="petwell-mobile-menu-close" onClick={closeMobileMenu}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Links */}
        <div className="petwell-mobile-nav-links" ref={mobileDropdownRef}>
          <Link className="petwell-mobile-nav-link" to="/" onClick={closeMobileMenu}>Home</Link>
          
          {/* Mobile About Us Link - Updated */}
          <a 
            className="petwell-mobile-nav-link" 
            href="#about"
            onClick={handleAboutUsClick}
          >
            About Us
          </a>
          
          {/* Mobile Services Dropdown */}
          <div className="petwell-mobile-dropdown">
            <div className="petwell-mobile-dropdown-wrapper">
              <Link 
                className="petwell-mobile-nav-link petwell-mobile-dropdown-main-link"
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileServicesDropdown();
                }}
              >
                <span>Stone Collection</span>
                <svg 
                  className={`petwell-mobile-dropdown-arrow ${isMobileServicesOpen ? 'open' : ''}`} 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>
              
              {/* Mobile Services Dropdown Menu */}
              <div className={`petwell-mobile-dropdown-menu ${isMobileServicesOpen ? 'show' : ''}`}>
                <div className="petwell-mobile-stone-grid">
                  {stoneCollections.map((stone) => (
                    <Link 
                      key={stone.id} 
                      className="petwell-mobile-stone-item" 
                      to={stone.path} 
                      onClick={closeMobileMenu}
                    >
                      <div className="petwell-mobile-stone-content">
                        <div className="petwell-mobile-stone-image-wrapper">
                          <img 
                            ref={el => imageRefs.current[`mobile-${stone.id}`] = el}
                            src={isMobileServicesOpen ? stone.image : null}
                            data-src={stone.image}
                            alt={stone.name} 
                            className={`petwell-mobile-stone-image ${loadedImages[stone.id] ? 'loaded' : 'loading'}`}
                            loading="lazy"
                            onLoad={() => handleImageLoad(stone.id)}
                          />
                        </div>
                        <div className="petwell-mobile-stone-text">
                          <div className="petwell-mobile-stone-name">{stone.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <Link className="petwell-mobile-nav-link" to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <Link className="petwell-mobile-nav-link" to="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>
          <Link className="petwell-mobile-nav-link" to="/our-recent-projects" onClick={closeMobileMenu}>Recent Projects</Link>
        </div>
        
        {/* REMOVED: Mobile Language Selector - Only WhatsApp button remains */}
        <div className="petwell-mobile-language-section">
          {/* WhatsApp Button in Mobile Drawer - Always visible */}
          <button 
            className="petwell-btn petwell-get-started-btn petwell-whatsapp-btn-mobile"
            onClick={() => {
              handleWhatsAppClick();
              closeMobileMenu();
            }}
          >
            <span className="petwell-btn-dot">•</span>
            <span className="petwell-btn-text">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;