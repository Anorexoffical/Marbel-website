import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import "../Style/Recentproject.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
import axios from "axios";
import { API_BASE, UPLOADS_BASE } from "../config";

// Product images (using existing asset in repo)
import homeImg from '../assets/home1.png';
import service1 from '../assets/service1.png';
import ourproject1 from '../assets/ourproject.png';
import ourproject2 from '../assets/ourproject2.png';
import ourproject3 from '../assets/ourproject3.png';
import ourproject4 from '../assets/ourproject4.png';
import ourproject5 from '../assets/ourproject5.png';
import ourproject6 from '../assets/ourproject6.png';
import ourproject7 from '../assets/ourproject7.png';
import ourproject8 from '../assets/ourproject8.png';
import ourproject9 from '../assets/ourproject9.png';
import ourproject10 from '../assets/ourproject10.png';
import ourproject11 from '../assets/ourproject11.png';
import ourproject13 from '../assets/ourproject13.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';
import service4 from '../assets/service4.png';
import service5 from '../assets/service5.png';
import service6 from '../assets/service6.png';

export default function RecentProjects() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("all");
  const [filteredRows, setFilteredRows] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const navigate = useNavigate();

  // Always start from top when visiting this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showProjectPopup) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
    
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [showProjectPopup]);

  // Fetch recent blogs (only 6)
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const response = await axios.get(`${API_BASE}/blogs/Blogposts`, {
          params: {
            page: 1,
            limit: 6, // Only fetch 6 blogs
            sort: "newest" // Get most recent blogs first
          }
        });
        
        if (response.data && Array.isArray(response.data.blogs)) {
          setRecentBlogs(response.data.blogs);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for filter dropdown change
  const handleViewFilterChange = (event) => {
    setViewFilter(event.target.value);
  };

  // Handler for explore button click - Show popup with animation
  const handleExploreClick = (card) => {
    setSelectedProject(card);
    setShowProjectPopup(true);
    setIsClosing(false);
  };

  // Handler for blog explore button
  const handleBlogExploreClick = (blogId) => {
    navigate(`/BlogDetail/${blogId}`);
  };

  // Close project popup with animation
  const closeProjectPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProjectPopup(false);
      setSelectedProject(null);
      setIsClosing(false);
    }, 300);
  };

  // Get Started button handler
  const handleGetStartedClick = () => {
    navigate("/contact-us");
  };

  // Close popup when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('project-popup-overlay')) {
      closeProjectPopup();
    }
  };

  //  third component 
  const cards = [
    {
      id: 1,
      imgSrc: ourproject1,
      title: 'Marble Project',
      description: 'Luxurious natural stone with unique veining patterns for elegant interiors.',
      fullDescription: 'This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.',
      features: [
        'Premium Carrara marble selection',
        'Custom cutting and polishing',
        'Seamless finish installation',
        'Enhanced durability treatments',
        'Timeless aesthetic design'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2,
      imgSrc: ourproject2,
      title: 'Granite Onyx Project',
      description: 'Durable and stunning stone with translucent properties for dramatic effects.',
      fullDescription: 'Our Granite Onyx project features a commercial installation with Brazilian Blue Granite. The stone was chosen for its exceptional durability and unique translucent properties that create dramatic lighting effects. The installation required precision cutting to maintain the natural stone patterns.',
      features: [
        'Brazilian Blue Granite',
        'Translucent lighting effects',
        'Precision cutting techniques',
        'Commercial-grade installation',
        'Natural pattern preservation'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3,
      imgSrc: ourproject3,
      title: 'Travertine Project',
      description: 'Classic natural stone with porous texture, perfect for traditional designs.',
      fullDescription: 'This Travertine project involved restoring a historic building with authentic Roman Travertine. The stone was carefully selected to match the original architecture and treated with specialized sealants to enhance its natural beauty while providing modern durability.',
      features: [
        'Authentic Roman Travertine',
        'Historic building restoration',
        'Specialized sealant treatment',
        'Architecture matching',
        'Modern durability enhancement'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4,
      imgSrc: ourproject4,
      title: 'Ceramic Project',
      description: 'Versatile and durable tiles available in countless designs and finishes.',
      fullDescription: 'Our ceramic tile project features a modern kitchen installation with custom-patterned Italian ceramic tiles. The project utilized advanced installation techniques to ensure perfect alignment and durability. The tiles were specially treated for stain resistance and easy maintenance.',
      features: [
        'Custom-patterned Italian tiles',
        'Advanced installation techniques',
        'Perfect alignment precision',
        'Stain resistance treatment',
        'Easy maintenance design'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5,
      imgSrc: ourproject5,
      title: 'Quartz Project',
      description: 'Engineered stone with exceptional durability and low maintenance.',
      fullDescription: 'This quartz countertop installation showcases premium engineered quartz with veining that mimics natural marble. The project involved custom fabrication for a seamless sink installation and edge detailing. The quartz was chosen for its non-porous surface and resistance to stains.',
      features: [
        'Premium engineered quartz',
        'Natural marble veining mimic',
        'Custom fabrication',
        'Seamless sink installation',
        'Non-porous stain resistance'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 6,
      imgSrc: ourproject6,
      title: 'Mosaic Project',
      description: 'Artistic tile patterns creating stunning visual effects for any space.',
      fullDescription: 'Our mosaic project features a custom-designed backsplash with hand-cut glass and natural stone mosaic tiles. The intricate pattern was created using traditional mosaic techniques combined with modern adhesives for lasting durability. Each piece was individually placed for perfect alignment.',
      features: [
        'Custom-designed backsplash',
        'Hand-cut glass tiles',
        'Natural stone mosaic',
        'Traditional techniques',
        'Modern adhesive technology'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 7,
      imgSrc: ourproject7,
      title: 'Modern Mosaic',
      description: 'Contemporary mosaic designs with geometric patterns.',
      fullDescription: 'A modern take on traditional mosaic, this project features geometric patterns with contrasting colors. The installation required precise cutting and placement to maintain clean lines and symmetry throughout the design.',
      features: [
        'Contemporary geometric patterns',
        'Contrasting color design',
        'Precise cutting technology',
        'Clean line maintenance',
        'Symmetrical placement'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 8,
      imgSrc: ourproject8,
      title: 'Heritage Mosaic',
      description: 'Traditional patterns with historical significance.',
      fullDescription: 'This heritage mosaic project recreates traditional patterns using authentic materials and techniques. The project involved extensive research to ensure historical accuracy while incorporating modern installation methods for longevity.',
      features: [
        'Traditional pattern recreation',
        'Authentic materials',
        'Historical accuracy research',
        'Modern installation methods',
        'Longevity focused design'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 9,
      imgSrc: ourproject9,
      title: 'Artistic Mosaic',
      description: 'Custom artistic designs for unique spaces.',
      fullDescription: 'An artistic mosaic installation featuring custom-designed patterns created specifically for this space. The project involved collaboration with local artists to create a unique visual statement using mixed materials including glass, stone, and ceramic.',
      features: [
        'Custom-designed patterns',
        'Local artist collaboration',
        'Unique visual statement',
        'Mixed material integration',
        'Space-specific design'
      ],
      btnText: 'Explore More',
      productImage: homeImg,
    },
  ];

  // 4th container 
  const swiperRef = useRef(null);

  const slides = [
  {
    id: 1,
    step: 'Step',
    number: '1',
    title: 'Select Your Perfect Stone & Surface',
    description:
      'Choose from a wide range of premium materials including marble, granite, ceramic, travertine, mosaic, and quartz—either through our website or by visiting our showroom.',
    background: 'linear-gradient(to left bottom, #19242B 55%, #0E4655 100%)',
    color: 'white',
    image: service1,
  },
  {
    id: 2,
    step: 'Step',
    number: '2',
    title: 'Precision Crafting & Polishing',
    description:
      'We expertly cut, polish, and finish your selected material, enhancing its natural character, durability, and surface quality to suit your space perfectly.',
    background: '#ffffffff',
    color: '#121212',
    image: ourproject13,
  },
  {
    id: 3,
    step: 'Step',
    number: '3',
    title: 'Seamless Installation & Transformation',
    description:
      'Our professional installation brings everything together—creating a refined, cozy, and unique environment that reflects craftsmanship, detail, and timeless design.',
    background: '#CAB3FF',
    color: '#121212',
    image: ourproject11,
  },
];


  // Helper function to truncate HTML content to one line
  const truncateHTMLToOneLine = (html, maxLength = 60) => {
    if (!html) return '';
    const div = document.createElement("div");
    div.innerHTML = html;
    const plainText = div.textContent || div.innerText || "";
    // Remove line breaks and extra spaces
    const singleLineText = plainText.replace(/\s+/g, ' ').trim();
    return singleLineText.length > maxLength
      ? `${singleLineText.substring(0, maxLength)}...`
      : singleLineText;
  };

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <Navbar />
      
      {/* UPDATED Project Detail Popup - White background with decorative circles */}
      {showProjectPopup && selectedProject && (
        <div 
          className={`project-popup-overlay ${isClosing ? 'fade-out' : ''}`}
          onClick={handleOverlayClick}
        >
          <div className={`project-popup-container ${isClosing ? 'fade-out' : ''}`}>
            {/* Background Circles Decoration */}
            <div className="popup-bg-circle popup-bg-circle-1"></div>
            <div className="popup-bg-circle popup-bg-circle-2"></div>
            <div className="popup-bg-circle popup-bg-circle-3"></div>
            <div className="popup-bg-circle popup-bg-circle-4"></div>
            
            <div className="project-popup-header">
              <h3 className="project-popup-title">{selectedProject.title}</h3>
              <button className="project-popup-close" onClick={closeProjectPopup}>
                <FaTimes />
              </button>
            </div>
            
            <div className="project-popup-content">
              {/* Content Section Only - No Image */}
              <div className="project-popup-details">
                <div className="project-popup-category">
                  {selectedProject.title.includes('Marble') ? 'Premium Stone' : 
                   selectedProject.title.includes('Granite') ? 'Luxury Stone' :
                   selectedProject.title.includes('Travertine') ? 'Classic Stone' :
                   selectedProject.title.includes('Ceramic') ? 'Tile Installation' :
                   selectedProject.title.includes('Quartz') ? 'Engineered Stone' : 'Mosaic Art'}
                </div>
                
                <div className="project-popup-description">
                  <p>{selectedProject.fullDescription}</p>
                  
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="popup-features-section">
                      <h4 className="features-title">Project Features:</h4>
                      <ul className="popup-features">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-popup-footer">
              <div className="popup-button-group">
                <button 
                  className="popup-cancel-btn" 
                  onClick={closeProjectPopup}
                >
                  <span className="popup-btn-dot">•</span>
                  <span className="popup-btn-text">Cancel</span>
                </button>
                <button 
                  className="popup-contact-btn" 
                  onClick={() => {
                    closeProjectPopup();
                    navigate("/contact-us");
                  }}
                >
                  <span className="popup-btn-dot">•</span>
                  <span className="popup-btn-text">Contact for Similar Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVERYTHING BELOW THIS REMAINS EXACTLY THE SAME AS BEFORE */}
      <div className="storepage-container container-fluid">
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="storepage-content">
              <h1 className="storepage-heading">Our Recent Projects</h1>
              <p className="storepage-description">
                A showcase of our finest marble, granite, and quartz installations.
                From luxury residential spaces to commercial masterpieces, each project
                reflects our commitment to quality craftsmanship and timeless design.
              </p>
              <p className="storepage-description mt-3">
                Our React-based project management system allows us to track every detail,
                ensuring seamless coordination from quarry selection to final installation.
              </p>
            </div>
          </div>

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 d-none d-lg-block">
            <div className="storepage-image">
              {/* Image will be set via background in CSS - Hidden on mobile/tablet */}
            </div>
          </div>
        </div>
      </div>

      {/* 2nd container */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our Recent Projects</h2>
        </div>

        {/* third section - cards */}
        <div className="product-cards-container py-4">
          <div className="product-cards-row">
            {cards.map((card) => (
              <div key={card.id} className="product-cards-col">
                <div className="product-card-item">
                  <div className="product-card-image-container">
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="product-card-img"
                    />
                  </div>
                  <div className="product-card-content">
                    <h5 className="product-card-heading">{card.title}</h5>
                    <div className="product-description-wrapper">
                      <p className="product-description">{card.description}</p>
                    </div>
                    <button
                      className="product-card-button"
                      onClick={() => handleExploreClick(card)}
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3rd container */}
      <div className="pd-steps-slider">
        <div className="pd-slider-info">
          <h2 className="pd-slider-main-heading">
            It&apos;s as easy as one, two, three..
          </h2>
          <button
            className="pd-slider-custom-btn"
            onClick={handleGetStartedClick}
          >
            <span className="pd-slider-btn-dot">•</span>
            <span className="pd-slider-btn-text">Get Started</span>
          </button>
        </div>

        <div className="pd-slider-main-container">
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className="pd-simple-swiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="pd-simple-slide">
                <div
                  className="pd-slider-slide"
                  style={{
                    background: slide.background,
                    color: slide.color,
                  }}
                >
                  <div className="pd-step-section">
                    <div className="pd-step-tag">
                      <span>{slide.step}</span>
                    </div>
                    <div className="pd-step-number">
                      <span>{slide.number}</span>
                    </div>
                  </div>

                  <div className="pd-slide-content">
                    <div className="pd-text-content">
                      <h3 className="pd-slider-title">{slide.title}</h3>
                      <p className="pd-slider-description">
                        {slide.description}
                      </p>
                    </div>
                    <div className="pd-image-content">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="pd-slide-image"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 4th container - Updated Blogs Section */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Explore Blogs For Better Understanding</h2>
        </div>

        <div className="pd-swiper-wrapper-container">
          {loadingBlogs ? (
            <div className="blogs-loading">
              <div className="spinner"></div>
              <p>Loading blogs...</p>
            </div>
          ) : recentBlogs.length === 0 ? (
            <div className="no-blogs-message">
              <p>No recent blogs available.</p>
            </div>
          ) : (
            <>
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                spaceBetween={16}
                navigation={{
                  nextEl: '.pd-custom-swiper-button-next',
                  prevEl: '.pd-custom-swiper-button-prev',
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1417: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                  },
                  1920: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                  },
                }}
                modules={[Navigation]}
                className="pd-related-swiper"
              >
                {recentBlogs.map((blog) => (
                  <SwiperSlide key={blog._id}>
                    <div className="pd-related-card">
                      <div className="pd-related-image-container">
                        <img
                          src={blog.blogImage ? `${UPLOADS_BASE}/${blog.blogImage}` : homeImg}
                          alt={blog.title}
                          className="pd-related-card-img"
                        />
                        {blog.category && (
                          <div className="pd-blog-category-badge">
                            {blog.category}
                          </div>
                        )}
                      </div>
                      <div className="pd-related-card-body">
                        <h5 className="pd-related-card-title">{blog.title}</h5>
                        <div className="pd-related-content-container">
                          <p className="pd-blog-excerpt">
                            {truncateHTMLToOneLine(blog.body, 60)}
                          </p>
                        </div>
                        <button
                          className="pd-related-card-btn"
                          onClick={() => handleBlogExploreClick(blog._id)}
                        >
                          <span className="pd-btn-text">Read Blog</span>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="pd-custom-navigation-container">
                <button className="pd-custom-swiper-button-prev" onClick={goPrev}>
                  ←
                </button>
                <button className="pd-custom-swiper-button-next" onClick={goNext}>
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}