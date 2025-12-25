import React, { useRef } from 'react';
import Navbar from './Navbar'; // Make sure to import your Navbar component
import '../Style/Home.css';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';





// Product images (using existing asset in repo)
import homeImg from '../assets/home1.png';
import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';
import service4 from '../assets/service4.png';
import service5 from '../assets/service5.png';
import service6 from '../assets/service6.png';
import whatweoffer from '../assets/whatweoffer.png';
import owner from '../assets/owner.png';
import factory from '../assets/factory.png';
import marketprice from '../assets/market-price.png';


const Homepage = ({ handleGetStarted = () => {}, handleExploreBenefits = () => {} }) => {
 
 
//  seccond component 
 
const cards = [
  {
    id: 1,
    imgSrc: service1,
    title: 'Marble',
    description: 'Luxurious natural stone with unique veining patterns for elegant interiors.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/marble', // Add page URL for redirection
  },
  {
    id: 2,
    imgSrc: service2,
    title: 'Granite Onyx',
    description: 'Durable and stunning stone with translucent properties for dramatic effects.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/granite-onyx',
  },
  {
    id: 3,
    imgSrc: service3,
    title: 'Travertine',
    description: 'Classic natural stone with porous texture, perfect for traditional designs.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/travertine',
  },
  {
    id: 4,
    imgSrc: service4,
    title: 'Ceramic',
    description: 'Versatile and durable tiles available in countless designs and finishes.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/ceramic',
  },
  {
    id: 5,
    imgSrc: service5,
    title: 'Quartz',
    description: 'Engineered stone with exceptional durability and low maintenance.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/quartz',
  },
  {
    id: 6,
    imgSrc: service6,
    title: 'Mosaic',
    description: 'Artistic tile patterns creating stunning visual effects for any space.',
    btnText: 'Explore More',
    productImage: homeImg,
    pageUrl: '/services/mosaic',
  },
];

 
 
 
 
 
 
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/contact-us');
  };
  const handleExploreBenefitsClick = () => {
    console.log('Explore benefits clicked');
  };
  const swiperRef = useRef(null);

  const productDetailCards = [
    {
      id: 1,
      title: 'FecalPCR Health Test',
      price: '$21.99',
      oldPrice: '$29.99',
      oneTimePrice: 21.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: "Comprehensive fecal PCR test for detecting parasites, bacteria, and viruses in your pet's digestive system.",
    },
    {
      id: 2,
      title: 'Gut Health Test',
      price: '$23.99',
      oldPrice: '$29.99',
      oneTimePrice: 23.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: "Comprehensive gut health test for your pet's digestive system.",
    },
    {
      id: 3,
      title: 'Allergy Test',
      price: '$23.99',
      oldPrice: '$29.99',
      oneTimePrice: 23.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: 'Comprehensive allergy test for your pet.',
    },
    {
      id: 4,
      title: 'Wellness Panel',
      price: '$23.99',
      oldPrice: '$29.99',
      oneTimePrice: 23.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: 'Comprehensive wellness panel for your pet.',
    },
    {
      id: 5,
      title: 'DNA Breed Test',
      price: '$20.99',
      oldPrice: '$29.99',
      oneTimePrice: 23.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: 'DNA breed test for your pet.',
    },
    {
      id: 6,
      title: 'Senior Health Test',
      price: '$23.99',
      oldPrice: '$29.99',
      oneTimePrice: 23.99,
      subscribePrice: 19.19,
      oldPriceValue: 29.99,
      productImage: homeImg,
      description: 'Senior health test for your pet.',
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




  // 4th container 

const steps = [
  {
    number: "01",
    title: "Stone Block Processing",
    text: "Once mined and transported to the processing plant, the blocks are cut into slabs creating parallel cuts, revealing the hidden beauty within each block."
  },
  {
    number: "02",
    title: "Resin Treatment",
    text: "A resin treatment fills any natural pores or cracks in the marble, strengthening the slab and providing a flawless finish."
  },
  {
    number: "03",
    title: "Stone Slab Finishing",
    text: "The slabs are then polished to create a smooth, glossy finish by grinding, sanding, and buffing the marble surface."
  },
  {
    number: "04",
    title: "Cut Slab To Size",
    text: "The polished slabs are cut into specific dimensions based on customer requirements for tiles, countertops, or custom elements."
  }
];

  return (
    <>
      <Navbar />
      {/* Added main-wrapper with specific padding for this page only */}
      <div className="homepage-wrapper">
        <div className="main-container main-ccontiner-landingpage">
       

          {/* Main Text and Buttons - Positioned at bottom */}
          <div className="content-wrap">
            <div className="content-treatment">Design</div>
            <div className="main-title">
          Luxury Marble, Granite & Quartz
          <br></br>
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





{/* seccond container  */}
{/* Related Products Slider */}
<div className="pd-related-products">
  <div className="pd-related-heading-container mb-4">
    <h2 className="pd-related-heading">Providing the best marble services</h2>
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






{/* third container  */}


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
From hand-selected stone to polished installation, we craft marble surfaces that elevate homes, outdoors, and kitchens with lasting beauty.          </p>
          <button className="petwell-futurpet-btn">
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
        <div className="petwell-futurpet-image-wrapper h-100 d-flex align-items-center justify-content-center justify-content-lg-end pe-lg-4 pe-xl-5">
          <img
            src={whatweoffer}
            alt="PetWell Hero"
            className="petwell-futurpet-image img-fluid rounded-4"
          />
        </div>
      </div>
    </div>
  </div>
</div>








{/* 4th container - About Us */}
<section className="about-section container-fluid py-5">
  <div className="row justify-content-center">
    {/* Left side – CEO info & company details */}
    <div className="col-lg-5">
      <div className="about-left ps-lg-5">
        {/* CEO Image */}
        <div className="ceo-image-wrapper mb-4">
          <img
            src={owner} 
            alt="CEO"
            className="img-fluid ceo-image"
          />
          <div className="ceo-info mt-3">
            <h5 className="ceo-name">John Smith</h5>
            <p className="ceo-title">CEO & Founder</p>
          </div>
        </div>

        {/* Company Points */}
        <div className="company-details">
          <div className="company-point">
            <div className="point-number d-flex align-items-center justify-content-center">
              <span>✓</span>
            </div>
            <div className="point-content">
              <h5>Founded in 1995</h5>
              <p>Over 25 years of excellence in marble craftsmanship</p>
            </div>
          </div>

          <div className="company-point">
            <div className="point-number d-flex align-items-center justify-content-center">
              <span>✓</span>
            </div>
            <div className="point-content">
              <h5>ISO 9001 Certified</h5>
              <p>Internationally recognized quality management system</p>
            </div>
          </div>

          <div className="company-point">
            <div className="point-number d-flex align-items-center justify-content-center">
              <span>✓</span>
            </div>
            <div className="point-content">
              <h5>Natural Stone Institute</h5>
              <p>Accredited member with highest industry standards</p>
            </div>
          </div>

          <div className="company-point">
            <div className="point-number d-flex align-items-center justify-content-center">
              <span>✓</span>
            </div>
            <div className="point-content">
              <h5>150+ Projects</h5>
              <p>Successfully completed luxury residential & commercial projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right side – About Us content */}
    <div className="col-lg-6 offset-lg-1">
      <div className="about-right pe-lg-5">
        <p className="about-tag">ABOUT US</p>
        <h2 className="about-heading">
          Who We Are<br />The Story Behind Excellence.
        </h2>
        <p className="about-desc">
          Founded with a vision to transform spaces with natural stone, our journey began in a small workshop with nothing but passion and craftsmanship. Today, we stand as one of the most trusted marble service providers, combining traditional techniques with modern innovation.
        </p>
        <div className="about-main-image-wrapper">
          {/* main company image */}
          <img
            src={factory} 
            alt="Our Marble Workshop"
            className="img-fluid about-main-image"
          />
        </div>
      </div>
    </div>
  </div>
</section>





















{/* 5th ccontiner */}


  <div className="container">
    <div className="row align-items-center">
      {/* <!-- Left Column - Text --> */}
      <div className="col-md-6 col-xl-6 col-sm-12 bestservices">

        <h2 className='bestservicesh'>Unmatched Network Performance at  <span className='mainwordabout'>Market-Leading Prices </span></h2>
        <p className='bestservicesp'> 
        We’ve optimized our backend infrastructure to ensure our SIM cards and data services deliver seamless connectivity, lightning-fast speeds, and unbeatable reliability. Along with top-tier performance, we offer highly competitive pricing, giving you the best value on airtime, data, and mobile services. Stay connected without overspending—because premium quality shouldn’t come at a premium cost.
        </p>

      </div>
      {/* <!-- Right Column - Image --> */}
      <div className="col-md-6 col-xl-6 col-sm-12">

        <img src={marketprice} className="img-fluid" alt="Responsive Image"/>

      </div>

    
    </div>
  </div>



  <div className="container">
    <div className="row align-items-center">
      {/* <!-- Left Column - Text --> */}


      <div className="col-md-6 col-xl-6 col-sm-12">

        <img src={marketprice} className="img-fluid" alt="Responsive Image"/>
      </div>


      <div className="col-md-6 col-xl-6 col-sm-12 bestservices2">

        <h2 className='bestservicesh'> <span className='mainwordabout2'>70+% signal strength </span> & Affordable Connectivity</h2>
        <p className='bestservicesp'> Enjoy 70%+ signal strength and reliability every time you connect. Get highly in-demand telecom features at budget-friendly rates, offering better value compared to other network providers in the market.</p>
     </div>
      {/* <!-- Right Column - Image --> */}
  
    </div>
  </div>
























 {/* 6th  container  */}

     {/* Related Products Slider */}
<div className="pd-related-products">
  <div className="pd-related-heading-container mb-4">
    <h2 className="pd-related-heading">Providing the best marble services</h2>
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
            <div className="pd-related-image-container">
              <img
                src={card.productImage}
                alt={card.title}
                className="pd-related-card-img"
              />
            </div>
            <div className="pd-related-card-body">
              <h5 className="pd-related-card-title">{card.title}</h5>
              <div className="pd-related-price-container">
                <span className="pd-related-current-price">
                  {card.price}
                </span>
                <span className="pd-related-old-price">
                  {card.oldPrice}
                </span>
              </div>
              <button
                className="pd-related-card-btn"
                onClick={() => handleAddRelatedToCart(card)}
              >
                <span className="pd-btn-text">Add to cart</span>
                <span className="pd-btn-icon">+</span>
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