import React, { useRef, useState } from 'react';
import Navbar from './Navbar';
import '../Style/Home.css';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// Product images
import homeImg from '../assets/home1.webp';
import service1 from '../assets/service1.webp';
import service2 from '../assets/service2.webp';
import service3 from '../assets/service3.webp';
import service4 from '../assets/service4.webp';
import service5 from '../assets/service5.webp';
import service6 from '../assets/service6.webp';
import whatweoffer from '../assets/whatweoffer.webp';
import owner from '../assets/owner.webp';
import factory from '../assets/factory.webp';
import marketprice from '../assets/marketprice.webp';
import marketprice2 from '../assets/marketprice2.webp';

// Import project images
import ourproject1 from '../assets/project/ourproject1.png';
import ourproject2 from '../assets/project/ourproject2.png';
import ourproject3 from '../assets/project/ourproject3.png';
import ourproject4 from '../assets/project/ourproject4.png';
import ourproject5 from '../assets/project/ourproject5.png';
import ourproject6 from '../assets/project/ourproject6.png';


const Homepage = ({ handleGetStarted = () => {}, handleExploreBenefits = () => {} }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState({});

  const markLoaded = (key) => {
    setImgLoaded(prev => ({ ...prev, [key]: true }));
  };
  
  // Reference to 5th container for scrolling
  const stoneValueSectionRef = React.useRef(null);
  // Reference to About Us section for scrolling
  const aboutUsSectionRef = React.useRef(null);

  const handleGetStartedClick = () => {
    navigate('/contact-us');
  };

  const handleExploreBenefitsClick = () => {
    // Scroll to the 5th container
    if (stoneValueSectionRef.current) {
      stoneValueSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to scroll to About Us section
  const scrollToAboutUs = () => {
    if (aboutUsSectionRef.current) {
      aboutUsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add highlight effect
      const aboutSection = aboutUsSectionRef.current;
      aboutSection.classList.add('highlighted');
      setTimeout(() => {
        aboutSection.classList.remove('highlighted');
      }, 2000);
    }
  };

  // Service cards data
  const cards = [
    {
      id: 1,
      imgSrc: service1,
      title: 'Marble',
      description: 'Luxurious natural stone with unique veining patterns for elegant interiors.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/marble',
    },
    {
      id: 2,
      imgSrc: service2,
      title: 'Granite Onyx',
      description: 'Durable and stunning stone with translucent properties for dramatic effects.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/granite',
    },
    {
      id: 3,
      imgSrc: service3,
      title: 'Travertine',
      description: 'Classic natural stone with porous texture, perfect for traditional designs.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/travertine',
    },
    {
      id: 4,
      imgSrc: service4,
      title: 'Ceramic',
      description: 'Versatile and durable tiles available in countless designs and finishes.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/ceramic',
    },
    {
      id: 5,
      imgSrc: service5,
      title: 'Quartz',
      description: 'Engineered stone with exceptional durability and low maintenance.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/quartz',
    },
    {
      id: 6,
      imgSrc: service6,
      title: 'Mosaic',
      description: 'Artistic tile patterns creating stunning visual effects for any space.',
      btnText: 'Explore More',
      productImage: homeImg,
      pageUrl: '/mosaic',
    },
  ];

  // Handle Explore More button click for services
  const handleExploreClick = (card) => {
    navigate(card.pageUrl);
  };

  // Product detail cards for projects
  const productDetailCards = [
    {
      id: 1,
      title: 'Marble Luxury Villa',
      price: '$45,000',
      oldPrice: '$52,000',
      oneTimePrice: 45000,
      subscribePrice: 42000,
      oldPriceValue: 52000,
      productImage: ourproject1,
      description: "Premium marble installation in a luxury villa featuring Italian Carrara marble with intricate veining patterns.",
    },
    {
      id: 2,
      title: 'Granite Corporate Lobby',
      price: '$38,500',
      oldPrice: '$45,000',
      oneTimePrice: 38500,
      subscribePrice: 36500,
      oldPriceValue: 45000,
      productImage: ourproject2,
      description: "Brazilian Blue Granite installation in corporate lobby with translucent lighting effects.",
    },
    {
      id: 3,
      title: 'Travertine Heritage Mansion',
      price: '$42,800',
      oldPrice: '$48,500',
      oneTimePrice: 42800,
      subscribePrice: 40500,
      oldPriceValue: 48500,
      productImage: ourproject3,
      description: 'Roman Travertine restoration project in historic mansion with specialized sealant treatment.',
    },
    {
      id: 4,
      title: 'Ceramic Modern Kitchen',
      price: '$28,900',
      oldPrice: '$34,500',
      oneTimePrice: 28900,
      subscribePrice: 27500,
      oldPriceValue: 34500,
      productImage: ourproject4,
      description: 'Custom-patterned Italian ceramic tiles in modern kitchen with advanced installation techniques.',
    },
    {
      id: 5,
      title: 'Quartz Luxury Condo',
      price: '$32,500',
      oldPrice: '$38,000',
      oneTimePrice: 32500,
      subscribePrice: 30800,
      oldPriceValue: 38000,
      productImage: ourproject5,
      description: 'Premium engineered quartz countertops with marble-like veining and custom fabrication.',
    },
    {
      id: 6,
      title: 'Mosaic Designer Home',
      price: '$37,200',
      oldPrice: '$42,800',
      oneTimePrice: 37200,
      subscribePrice: 35300,
      oldPriceValue: 42800,
      productImage: ourproject6,
      description: 'Custom-designed mosaic backsplash with hand-cut glass and natural stone tiles.',
    },
  ];

  const handleProductClick = (product) => {
    navigate('/Productdetail', { state: { product } });
  };

  const handleAddRelatedToCart = (card) => {
    // Add your cart logic here
    console.log('Adding to cart:', card);
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

  // Handle Learn More button click - redirect to blog page
  const handleLearnMoreClick = () => {
    navigate('/blog');
  };

  return (
    <>
      {/* Pass scrollToAboutUs function to Navbar */}
      <Navbar scrollToAboutUs={scrollToAboutUs} />
      
      {/* Added main-wrapper with specific padding for this page only */}
      <div className="homepage-wrapper">
        <div className="main-container main-ccontiner-landingpage">
          {/* Main Text and Buttons - Positioned at bottom */}
          <div className="content-wrap">
            <div className="content-treatment">Design</div>
            <div className="main-title">
              Luxury Marble, Granite & Quartz
              <br />
              Delivered in 24–48 hours
            </div>
            <div className="main-subtitle">
              Every space has unique design needs. We provide high-quality marble, granite, travertine, ceramic, and quartz surfaces—crafted to enhance durability, elegance, and long-term value for homes and commercial spaces.
            </div>
            <div className="d-flex align-items-center button-container">
              <button
                className="petwell-get-started-btn1"
                onClick={handleGetStartedClick}
              >
                <span className="petwell-btn-dot">•</span>
                <span className="petwell-btn-text">Get Started</span>
              </button>
              <button
                className="btn-main-secondary"
                onClick={handleExploreBenefitsClick}
              >
                Explore benefits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second container - Services */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Providing the best marble services</h2>
        </div>

        {/* Services cards section */}
        <div className="product-cards-container py-4">
          <div className="product-cards-row">
            {cards.map((card) => (
              <div key={card.id} className="product-cards-col">
                <div className="product-card-item">
                  <div className={`product-card-image-container skeleton ${imgLoaded[`service-${card.id}`] ? 'loaded' : ''}`}>
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="product-card-img"
                      loading="lazy"
                      onLoad={() => markLoaded(`service-${card.id}`)}
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

      {/* Third container */}
      <div className="petwell-futurpet-section" id="specific-page-section">
        <div className="container-fluid">
          <div className="row align-items-center g-0">
            {/* Left: Text Section */}
            <div className="col-12 col-lg-6">
              <div className="petwell-futurpet-text ps-lg-4 ps-xl-5">
                <h1 className="mb-4 mb-lg-5">
                  Transform your home with elegance —
                  <span className="petwell-futurpet-highlight">
                    {' '}
                    Marble crafted for timeless living spaces
                  </span>
                </h1>
                <p className="mb-4 mb-lg-5 ps-0">
                  From hand-selected stone to polished installation, we craft marble surfaces that elevate homes, outdoors, and kitchens with lasting beauty.
                </p>
                <button className="petwell-futurpet-btn" onClick={handleLearnMoreClick}>
                  <span className="petwell-futurpet-btn-dot position-absolute">
                    •
                  </span>
                  <span className="petwell-futurpet-btn-text w-100 text-end pe-4">
                    Learn more
                  </span>
                </button>
              </div>
            </div>
            {/* Right: Image Section */}
            <div className="col-12 col-lg-6">
              <div className={`petwell-futurpet-image-wrapper h-100 d-flex align-items-center justify-content-center justify-content-lg-end pe-lg-4 pe-xl-5 skeleton ${imgLoaded['whatweoffer'] ? 'loaded' : ''}`}>
                <img
                  src={whatweoffer}
                  alt="What We Offer"
                  className="petwell-futurpet-image img-fluid rounded-4"
                  loading="lazy"
                  onLoad={() => markLoaded('whatweoffer')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4th container - About Us - Added ref for scrolling */}
      <section className="about-section container-fluid py-5" id="about" ref={aboutUsSectionRef}>
        <div className="row justify-content-center">
          {/* Right side – About Us content - FIRST ON MOBILE */}
          <div className="col-lg-6 order-lg-last offset-lg-1 order-first">
            <div className="about-right pe-lg-5">
              <p className="about-tag">ABOUT OUR COMPANY</p>
              <h2 className="about-heading">
                WAHAT AL HIJAZ MARBLE & GRANITE
              </h2>
              <h3 className="company-subtitle">
                Crafting Excellence Since 2017
              </h3>
              <p className="about-desc">
                WAHAT AL HIJAZ MARBLE & GRANITE CRATCH & CUTTING LLC.SP is a premier company engaged in the import, export, and fabrication of premium quality marble, granite, natural stone, and reconstituted stone. Established in 2017 with our state-of-the-art fabricating unit in Sharjah, UAE, we have expanded our operations to include a fully mechanized factory in Amghara, Kuwait.
              </p>
              
              <div className="about-highlights mb-4">
                <div className="highlight-item">
                  <div className="highlight-content">
                    <h6>Industrial Excellence</h6>
                    <p>Government registered and certified industrial establishment with valid Industrial Register Certificate No. SR-2022-785</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-content">
                    <h6>Quality Commitment</h6>
                    <p>We ensure quality material, timely delivery, and build long-term relationships with our valued clients worldwide</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-content">
                    <h6>Global Operations</h6>
                    <p>Headquartered in Sharjah with operations extending to Kuwait, serving both commercial and residential projects</p>
                  </div>
                </div>
              </div>

              <p className="about-desc">
                Our company specializes in a wide range of products including marble, granite, slate, sandstone, quartzite, limestone, quartz stone, ceramic, terracotta, articles, and monuments. We offer both commercial and residential project fabrication and supply, with a growing inventory that includes both new and classic styles of natural stone.
              </p>
              
              <p className="about-desc">
                At WAHAT AL HIJAZ, we promise products of exceptional quality, purity, and beauty that stand the test of time. Our skilled workforce combines technical know-how with traditional craftsmanship to meet all challenges without compromising on quality. Our competitive pricing, on-schedule delivery, and superior client services create value for our clients' businesses.
              </p>

              <div className={`about-main-image-wrapper skeleton ${imgLoaded['factory'] ? 'loaded' : ''}`}>
                <img
                  src={factory} 
                  alt="WAHAT AL HIJAZ Marble & Granite Factory"
                  className="img-fluid about-main-image"
                  loading="lazy"
                  onLoad={() => markLoaded('factory')}
                />
              </div>
            </div>
          </div>

          {/* Left side – CEO info & company details - SECOND ON MOBILE */}
          <div className="col-lg-5 order-lg-first order-last">
            <div className="about-left ps-lg-5 mt-lg-0 mt-5">
              {/* CEO Image */}
              <div className={`ceo-image-wrapper mb-4 skeleton ${imgLoaded['owner'] ? 'loaded' : ''}`}>
                <img
                  src={owner} 
                  alt="CEO - Mr. Irfan"
                  className="img-fluid ceo-image"
                  loading="lazy"
                  onLoad={() => markLoaded('owner')}
                />
                <div className="ceo-info mt-3">
                  <h5 className="ceo-name">MR. IRFAN</h5>
                  <p className="ceo-title">CEO & Founder</p>
                </div>
              </div>

              {/* Government Certificate */}
              <div className="certificate-card mb-5">
                <div className="certificate-header">
                  <h5 className="certificate-title">
                    Industrial Register Certificate
                  </h5>
                </div>
                <div className="certificate-body">
                  <div className="certificate-info">
                    <div className="info-row">
                      <span className="info-label">Certificate No:</span>
                      <span className="info-value">SR-2022-785</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Issued Date:</span>
                      <span className="info-value">January 15, 2022</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Valid Until:</span>
                      <span className="info-value">January 14, 2027</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Issuing Authority:</span>
                      <span className="info-value">Ministry of Industry & Commerce</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Points */}
              <div className="company-details">
                <div className="company-point">
                  <div className="point-number d-flex align-items-center justify-content-center">
                    <span>✓</span>
                  </div>
                  <div className="point-content">
                    <h5 className="point-title">Founded in 2017</h5>
                    <p className="point-text">State-of-the-art fabricating unit in Sharjah, UAE with growing operations</p>
                  </div>
                </div>

                <div className="company-point">
                  <div className="point-number d-flex align-items-center justify-content-center">
                    <span>✓</span>
                  </div>
                  <div className="point-content">
                    <h5 className="point-title">Premium Quality Materials</h5>
                    <p className="point-text">Import, export & fabrication of marble, granite & natural stones</p>
                  </div>
                </div>

                <div className="company-point">
                  <div className="point-number d-flex align-items-center justify-content-center">
                    <span>✓</span>
                  </div>
                  <div className="point-content">
                    <h5 className="point-title">Government Certified</h5>
                    <p className="point-text">Officially registered industrial establishment with valid certifications <strong>license NO. 766679</strong></p>

                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5th container - Updated - Added ref for scrolling */}
      <div className="container-fluid px-0 vh-100 d-flex align-items-center stone-value-section" ref={stoneValueSectionRef}>
        <div className="row g-0 w-100">
          {/* First Row */}
          <div className="row align-items-center g-0 h-50 mb-md-0 mb-4">
            {/* Left Column - Text */}
            <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center stone-content-primary h-100 ps-lg-5 ps-md-4 ps-3 pe-lg-5 pe-md-4 pe-3">
              <div className="stone-content-wrapper">
                <h2 className='stone-heading-primary mb-4'>
                  Premium Marble Quality at <span className='stone-highlight-accent'>Market-Leading Price</span>
                </h2>
                <p className='stone-description-primary'>
                  We provide premium marble, granite, and natural stone sourced directly from trusted quarries, ensuring superior quality, durability, and elegant finishes at market-leading prices. By eliminating middlemen and optimizing our cutting.
                </p>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="col-md-6 col-lg-6 d-flex align-items-center justify-content-center h-100 ps-lg-5 ps-md-4 ps-3 pe-lg-5 pe-md-4 pe-3">
              <div className={`stone-image-container skeleton ${imgLoaded['marketprice'] ? 'loaded' : ''}`}>
                <img src={marketprice} className="img-fluid stone-visual-img" alt="Market Leading Prices" loading="lazy" />
                {/* Mark loaded when image fires onLoad */}
                <img style={{display:'none'}} src={marketprice} alt="" onLoad={() => markLoaded('marketprice')} />
                <div className="stone-image-glow"></div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="row align-items-center g-0 h-50 mt-md-0 mt-4">
            {/* Left Column - Image */}
            <div className="col-md-6 col-lg-6 order-md-1 order-2 d-flex align-items-center justify-content-center h-100 ps-lg-5 ps-md-4 ps-3 pe-lg-5 pe-md-4 pe-3">
              <div className={`stone-image-container skeleton ${imgLoaded['marketprice2'] ? 'loaded' : ''}`}>
                <img src={marketprice2} className="img-fluid stone-visual-img" alt="Signal Strength" loading="lazy" />
                <img style={{display:'none'}} src={marketprice2} alt="" onLoad={() => markLoaded('marketprice2')} />
                <div className="stone-image-glow stone-glow-secondary"></div>
              </div>
            </div>
            {/* Right Column - Text */}
            <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center stone-content-secondary order-md-2 order-1 h-100 ps-lg-5 ps-md-4 ps-3 pe-lg-5 pe-md-4 pe-3">
              <div className="stone-content-wrapper">
                <h2 className='stone-heading-primary mb-4'>
                  <span className='stone-highlight-secondary'>90%+ Quality</span> Performance & Smart Pricing
                </h2>
                <p className='stone-description-primary'>
                  Experience consistently high performance with up to 90% quality reliability across all our services. We offer a complete one-window solution, covering everything you need under one platform—without hidden costs or compromises. By aligning our offerings with current market standards and optimizing delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6th container - Recent Projects */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our recent Projects</h2>
        </div>

        <div className="pd-swiper-wrapper-container">
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
            {productDetailCards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="pd-related-card">
                  <div className={`pd-related-image-container skeleton ${imgLoaded[`project-${card.id}`] ? 'loaded' : ''}`}>
                    <img
                      src={card.productImage}
                      alt={card.title}
                      className="pd-related-card-img"
                      loading="lazy"
                      onLoad={() => markLoaded(`project-${card.id}`)}
                    />
                  </div>
                  <div className="pd-related-card-body">
                    <h5 className="pd-related-card-title">{card.title}</h5>
                      
                    <button
                      className="pd-related-card-btn"
                      onClick={() => navigate('/our-recent-projects')}
                    >
                      <span className="pd-btn-text">View More detail</span>
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
        </div>
      </div>
    </>
  );
};

export default Homepage;