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



const Homepage = ({ handleGetStarted = () => {}, handleExploreBenefits = () => {} }) => {
 
 
//  seccond component 
 
 // Update these image sources as needed in your project setup
 const cards = [
   {
     id: 1,
    imgSrc: homeImg,
     title: 'FecalPCR Health Test',
     price: '$21.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 21.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       "Comprehensive fecal PCR test for detecting parasites, bacteria, and viruses in your pet's digestive system.",
     features: [
       '24-48 hour results',
       'Vet-grade accuracy',
       'At-home collection',
       'Digital results',
     ],
   },
   {
     id: 2,
    imgSrc: homeImg,
     title: 'Gut Health Test',
     price: '$23.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 23.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       'Advanced gut microbiome analysis to identify bacterial imbalances and digestive issues.',
     features: [
       'Microbiome analysis',
       'Personalized recommendations',
       'Easy sample collection',
       'Veterinary reviewed',
     ],
   },
   {
     id: 3,
    imgSrc: homeImg,
     title: 'Allergy Test',
     price: '$23.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 23.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       'Comprehensive allergy screening to identify environmental and food allergens affecting your pet.',
     features: [
       '150+ allergens',
       'At-home blood collection',
       'Personalized diet tips',
       'Vet consultation included',
     ],
   },
   {
     id: 4,
    imgSrc: homeImg,
     title: 'Wellness Panel',
     price: '$23.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 23.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       'Complete health screening covering major organ functions and wellness markers.',
     features: [
       'Liver & kidney function',
       'Thyroid levels',
       'Complete blood count',
       'Urinalysis',
     ],
   },
   {
     id: 5,
    imgSrc: homeImg,
     title: 'DNA Breed Test',
     price: '$20.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 23.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       "Discover your dog's breed composition and genetic health markers with our advanced DNA test.",
     features: [
       '350+ breeds',
       'Health screening',
       'Trait analysis',
       'Ancestry report',
     ],
   },
   {
     id: 6,
    imgSrc: homeImg,
     title: 'Senior Health Test',
     price: '$23.99',
     oldPrice: '$29.99',
     btnText: 'Add to cart',
     oneTimePrice: 23.99,
     subscribePrice: 19.19,
     oldPriceValue: 29.99,
    productImage: homeImg,
     description:
       'Specialized testing for senior pets focusing on age-related health concerns and preventive care.',
     features: [
       'Arthritis markers',
       'Organ function',
       'Dental health',
       'Mobility assessment',
     ],
   },
 ];
 
 
 
 
 
 
 
 
  const navigate = useNavigate();
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
            <div className="content-treatment">Treatment</div>
            <div className="main-title">
              Luxury of Marble Stone for Modern Design
              <br />
              24–48 hour results.
            </div>
            <div className="main-subtitle">
              Your pet doesn't have the same needs everywhere. Identify and
              address bacterial overgrowths and imbalances.
            </div>
            <div className="d-flex align-items-center button-container">
              <button
                className="petwell-get-started-btn1"
                onClick={handleGetStarted}
              >
                <span className="petwell-btn-dot">•</span>
                <span className="petwell-btn-text">Get Started</span>
              </button>
              <button
                className="btn-main-secondary"
                onClick={handleExploreBenefits}
              >
                Explore benefits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* second container  */}

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
                    <div className="product-price-wrapper">
                      <span className="product-current-price">{card.price}</span>
                      <span className="product-old-price">{card.oldPrice}</span>
                    </div>
                    <button
                      className="product-card-button"
                      onClick={() => handleProductClick(card)}
                    >
                      {card.btnText}
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
            The future of pet health is
            <span className="petwell-futurpet-highlight">
              {' '}
              preventive, personal and positive
            </span>
          </h1>
          <p className="mb-4 mb-lg-5 ps-0">
            PetWell combines scientific precision with emotional care —
            helping every pet live longer, happier, and closer to you.
          </p>
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
            src={homeImg}
            alt="PetWell Hero"
            className="petwell-futurpet-image img-fluid rounded-4"
          />
        </div>
      </div>
    </div>
  </div>
</div>








 {/* 5th ccontienr  */}

 <section className="process-section container-fluid py-5">
      <div className="row justify-content-center">
        {/* Left side – steps */}
        <div className="col-lg-5">
          <div className="process-left">
            <div className="stack-image d-none d-md-block">
              {/* replace with your own image src */}
              <img
                src={homeImg}
                alt="Stacked marble"
                className="img-fluid"
              />
            </div>

            {steps.map(step => (
              <div className="process-step d-flex" key={step.number}>
                <div className="step-number d-flex align-items-center justify-content-center">
                  <span>{step.number}</span>
                </div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side – text + image */}
        <div className="col-lg-6 offset-lg-1">
          <div className="process-right">
            <p className="process-tag">WHAT WE DO</p>
            <h2 className="process-heading">
              The Value Is In The Process<br />For Exceptional.
            </h2>
            <p className="process-desc">
              From the moment marble emerges from the earth&apos;s embrace, it begins a journey of transformation guided by innovative techniques and skilled hands that carefully transform the raw stone into exquisite pieces.
            </p>
            <div className="process-main-image-wrapper">
              {/* main factory image */}
              <img
                src={homeImg}
                alt="Marble factory"
                className="img-fluid process-main-image"
              />
              {/* floating slab image */}
              <img
                src={homeImg}
                alt="Marble slab"
                className="process-floating-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>








 {/* 5th  container  */}

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