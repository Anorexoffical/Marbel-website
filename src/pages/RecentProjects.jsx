import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdExpandMore, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import "../Style/Marble.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import "../Style/Recentproject.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
import axios from "axios";
import { API_BASE, UPLOADS_BASE } from "../config";

// Product images (using existing asset in repo)
import homeImg from '../assets/home1.webp';
import service1 from '../assets/service1.webp';
import ourproject1 from '../assets/project/ourproject1.webp';
import ourproject2 from '../assets/project/ourproject2.webp';
import ourproject3 from '../assets/project/ourproject3.webp';
import ourproject4 from '../assets/project/ourproject4.webp';
import ourproject5 from '../assets/project/ourproject5.webp';
import ourproject6 from '../assets/project/ourproject6.webp';
import ourproject7 from '../assets/project/ourproject7.webp';
import ourproject8 from '../assets/project/ourproject8.webp';
import ourproject9 from '../assets/project/ourproject9.webp';
import ourproject10 from '../assets/project/ourproject10.webp';
import ourproject11 from '../assets/project/ourproject11.webp';
import ourproject13 from '../assets/project/ourproject13.webp';



// Dynamically import project images: File 1.webp ... File 150.webp
// Exclude specific indices that should not be shown
const excludedImageIndices = new Set([
  // Previously excluded
  110, 109, 82, 83, 67, 68, 72, 73, 75, 77, 79, 80, 58, 60, 62,
  // Newly excluded per request
  37, 38, 39, 41, 50, 24, 25, 26, 27, 31, 34, 5, 36, 7, 16, 17, 18, 19, 4,
  // Exclude File 9 to avoid duplicate with base card id 9
  9,
  // Additional removals
  20, 76, 112, 113, 114, 28, 65, 108, 126, 111
]);

const projectImageModules = import.meta.glob('../assets/project/*.webp', { eager: true, as: 'url' });
const projectImages = Object.entries(projectImageModules)
  .map(([p, url]) => {
    const m = p.match(/File\s(\d+)\.webp$/);
    return m ? { index: Number(m[1]), url } : null;
  })
  .filter(Boolean)
  .filter(({ index }) => index >= 1 && index <= 150 && !excludedImageIndices.has(index))
  .sort((a, b) => a.index - b.index);

// Helper to get image URL by file index
const getProjectImageUrlByIndex = (idx) => {
  const found = projectImages.find((e) => e.index === idx);
  return found ? found.url : homeImg;
};

// Indices representing steps/stairs projects
const stepsIndices = new Set([
  84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  // Newly added step indices
  99, 100, 101, 102, 103, 104, 105, 106, 107,
  116, 119,
  136, 137, 138, 139, 140, 141, 142,
  145,
  // New step
  129
]);

// Indices representing kitchen design projects
const kitchenIndices = new Set([1, 2, 3, 35, 128, 134, 143]);

// Indices representing vanity design projects (formerly washroom)
const washroomIndices = new Set([
  6, 8, 21, 23, 45, 46, 47, 48, 49, 51, 52, 53, 54,
  55, 56, 57, 59, 61, 63, 64, 66, 78,
  115, 117, 118, 120, 130, 131, 132, 133, 135,
  144, 146, 148, 149, 150,
  // New vanity (washroom) items
  33, 40, 123, 74
]);

// Indices representing table design projects
const tableIndices = new Set([10, 11, 12, 13, 14, 15, 22, 32, 29, 70]);

// Indices representing floor design projects
const floorIndices = new Set([42, 43, 69, 81, 121, 125]);

// Indices representing media wall projects
const mediaWallIndices = new Set([30, 44, 71]);


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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(15);
  
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

                  <option value="table">Table</option>
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
    setCurrentPage(0);
  };

  // Handler for filter dropdown change
  const handleViewFilterChange = (event) => {
    setViewFilter(event.target.value);
    setCurrentPage(0);
  };

  // Derive a simple category from project title
  const getProjectCategory = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes('vanity') || t.includes('washroom')) return 'vanity';
    if (t.includes('kitchen')) return 'kitchen';
    if (t.includes('step') || t.includes('stair')) return 'steps';
    if (t.includes('floor')) return 'floor';
    if (t.includes('table')) return 'table';
    if (t.includes('media wall') || t.includes('mediawall')) return 'mediawall';
    if (t.includes('marble')) return 'marble';
    if (t.includes('granite')) return 'granite';
    if (t.includes('travertine')) return 'travertine';
    if (t.includes('ceramic')) return 'ceramic';
    if (t.includes('quartz')) return 'quartz';
    if (t.includes('mosaic')) return 'mosaic';
    return 'other';
  };

  // Filtering will be defined after cards declaration

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
  const baseCards = [
    {
      id: 1,
      imgSrc: ourproject1,
      title: 'White Grey granite ',
      description: 'Luxurious natural stone with unique veining patterns for elegant interiors.',
      fullDescription: 'This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.This marble project showcases a premium residential installation featuring Carrara marble with intricate veining patterns. The project involved custom cutting and polishing to achieve a seamless finish. The marble was specially selected for its durability and aesthetic appeal, creating a timeless look for the modern interior.',
      features: [
        'Premium Carrara marble selection',
        'Custom cutting and polishing',
        'Seamless finish installation',
        'Enhanced durability treatments',
        'Timeless aesthetic design'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2,
      imgSrc: ourproject2,
      title: 'Travertine Tiles',
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
      title: 'Travertine Tiles',
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
      title: 'Trvertine Tile ',
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
      title: 'Washroom Vianity',
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
      title: 'Steps New Design',
      description: 'Artistic tile patterns creating stunning visual effects for any space.',
      fullDescription: 'Our mosaic project features a custom-designed backsplash with hand-cut glass and natural stone mosaic tiles. The intricate pattern was created using traditional mosaic techniques combined with modern adhesives for lasting durability. Each piece was individually placed for perfect alignment.',
      features: [
        'Custom-designed backsplash',
        'Hand-cut glass tiles',
        'Natural stone mosaic',
        'Traditional techniques',
        'Modern adhesive technology'
      ],
      isSteps: true,
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
      title: 'Washroom Vanity',
      description: 'Traditional patterns with historical significance.',
      fullDescription: 'This heritage mosaic project recreates traditional patterns using authentic materials and techniques. The project involved extensive research to ensure historical accuracy while incorporating modern installation methods for longevity.',
      features: [
        'Traditional pattern recreation',
        'Authentic materials',
        'Historical accuracy research',
        'Modern installation methods',
        'Longevity focused design'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 9,
      imgSrc: ourproject9,
      title: 'Travertine Table',
      description: 'Handcrafted travertine table with durable sealed finish.',
      fullDescription: 'A premium travertine table designed for everyday use and timeless appeal. Sealed to resist stains and moisture, with precision edge detailing and a balanced, natural texture that complements modern and classic interiors.',
      features: [
        'Sealed stain-resistant surface',
        'Precision edge detailing',
        'Balanced natural texture',
        'Durable everyday use',
        'Custom sizes available'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Steps/Stairs projects added into baseCards
    {
      id: 84,
      imgSrc: getProjectImageUrlByIndex(84),
      title: 'Granite Staircase Installation',
      description: 'Durable granite steps with anti-slip finish and precise nosing.',
      fullDescription: 'Precision-crafted granite steps designed for high-traffic staircases. Slip-resistant finishes and profiled edges deliver safety, durability, and a premium architectural look for residential and commercial spaces.',
      features: [
        'Slip-resistant finish',
        'Profiled nosing edges',
        'Custom sizes and thickness',
        'Commercial-grade durability',
        'Premium polish and sealing'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 85,
      imgSrc: getProjectImageUrlByIndex(85),
      title: 'Black Granite',
      description: 'Sleek black granite steps for modern interiors and entrances.',
      fullDescription: 'Elegant black granite steps with polished or flamed surface for the right balance of style and traction. Engineered for longevity and easy maintenance in contemporary spaces.',
      features: [
        'Polished/flamed options',
        'High-density granite',
        'Easy maintenance',
        'Modern aesthetic',
        'Indoor/outdoor suitable'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 86,
      imgSrc: getProjectImageUrlByIndex(86),
      title: 'Black Granite',
      description: 'Premium black granite staircase treads and risers.',
      fullDescription: 'High-density black granite with clean arris edges and anti-slip treatment. Perfect for both indoor and outdoor staircase applications where strength and refinement are essential.',
      features: [
        'Anti-slip treatment',
        'Arris edge detailing',
        'Weather resistant',
        'Uniform grain',
        'Long-term durability'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 87,
      imgSrc: getProjectImageUrlByIndex(87),
      title: 'White Granite',
      description: 'Bright white granite steps that elevate light and contrast.',
      fullDescription: 'White granite steps enhance brightness and visual space, pairing beautifully with dark railings. Finished for traction and sealed for protection against staining.',
      features: [
        'Light-enhancing tone',
        'Non-slip finish',
        'Sealed for protection',
        'Refined edge profiles',
        'Easy to clean'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 88,
      imgSrc: getProjectImageUrlByIndex(88),
      title: 'Red Granite',
      description: 'Versatile granite steps in custom sizes and profiles.',
      fullDescription: 'Granite steps fabricated to specification with consistent thickness, true edges, and excellent weather resistance. A reliable, attractive choice for any stairway.',
      features: [
        'Custom fabrication',
        'Consistent thickness',
        'True, square edges',
        'Weather resistant',
        'Timeless appearance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 89,
      imgSrc: getProjectImageUrlByIndex(89),
      title: 'Yellow Granite',
      description: 'Warm yellow granite steps with natural character.',
      fullDescription: 'Yellow granite steps add warmth and texture to entrances and terraces. Stain-resistant surfaces and expertly finished nosing provide safety and durability.',
      features: [
        'Warm natural tone',
        'Stain-resistant surface',
        'Expert nosing finish',
        'Outdoor friendly',
        'Low maintenance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 90,
      imgSrc: getProjectImageUrlByIndex(90),
      title: 'Black Granite with Profile Light',
      description: 'Illuminated black granite steps with integrated LED profile.',
      fullDescription: 'Black granite steps integrated with profile lighting for enhanced safety and luxury ambience. Precision channels allow clean, concealed LED installation.',
      features: [
        'Integrated LED profile',
        'Precision light channels',
        'Enhanced safety at night',
        'Premium visual effect',
        'Clean cable management'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 91,
      imgSrc: getProjectImageUrlByIndex(91),
      title: 'White Granite',
      description: 'Crisp white granite steps with subtle veining.',
      fullDescription: 'Elegant white granite with subtle veining for a refined staircase. Anti-slip finishing and sealed surfaces ensure long-term performance and easy care.',
      features: [
        'Subtle natural veining',
        'Anti-slip finish',
        'Sealed for longevity',
        'Refined edges',
        'Brightens interiors'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 92,
      imgSrc: getProjectImageUrlByIndex(92),
      title: 'white Granite',
      description: 'Granite stair treads and risers, made to measure.',
      fullDescription: 'Custom-fabricated granite treads and risers with consistent thickness and precise alignment for seamless stair runs in homes and commercial projects.',
      features: [
        'Made-to-measure pieces',
        'Precise alignment',
        'Consistent thickness',
        'Durable composition',
        'Suitable for heavy use'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 93,
      imgSrc: getProjectImageUrlByIndex(93),
      title: 'White Finish',
      description: 'Refined white-finish steps that brighten any space.',
      fullDescription: 'White-finish steps designed with non-slip treatment and easy-care surfaces. Ideal for modern interiors and minimalist spaces.',
      features: [
        'Non-slip treatment',
        'Easy-care surface',
        'Minimalist aesthetic',
        'Clean lines',
        'Indoor friendly'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 94,
      imgSrc: getProjectImageUrlByIndex(94),
      title: 'Gray Granite',
      description: 'Neutral gray granite steps for modern architecture.',
      fullDescription: 'Neutral gray granite steps that complement contemporary designs. Durable texture and protective sealers resist wear and staining over time.',
      features: [
        'Contemporary neutral tone',
        'Protective sealers',
        'Wear resistant',
        'Low porosity',
        'Precision cut edges'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 95,
      imgSrc: getProjectImageUrlByIndex(95),
      title: 'Gray Granite',
      description: 'Sleek gray granite steps with uniform grain.',
      fullDescription: 'Sleek, uniform-grain gray granite engineered for high-footfall areas. Excellent structural integrity and refined finish for long-term use.',
      features: [
        'Uniform grain',
        'High structural integrity',
        'Refined finish',
        'Heavy-duty suitable',
        'Weather tolerant'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 96,
      imgSrc: getProjectImageUrlByIndex(96),
      title: 'Grey Granite',
      description: 'Grey granite steps with anti-slip nosing.',
      fullDescription: 'Robust grey granite steps with anti-slip nosing and chamfered edges. Ideal for outdoor staircases, terraces, and public approaches.',
      features: [
        'Anti-slip nosing',
        'Chamfered edges',
        'Outdoor-ready',
        'Strong and stable',
        'Easy upkeep'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 97,
      imgSrc: getProjectImageUrlByIndex(97),
      title: 'White & Black Granite',
      description: 'Contrasting white and black granite for feature stairs.',
      fullDescription: 'A striking combination of white and black granite across treads and risers. Balanced contrast, precise joints, and a premium architectural statement.',
      features: [
        'High contrast design',
        'Precise jointing',
        'Premium statement look',
        'Durable finishes',
        'Custom sizing available'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 98,
      imgSrc: getProjectImageUrlByIndex(98),
      title: 'white with black spots Granite',
      description: 'Engineered granite steps tailored to specification.',
      fullDescription: 'Engineered granite steps tailored to project specification. Attention to detail from quarry selection to final polish ensures a premium finish and long service life.',
      features: [
        'Project-tailored fabrication',
        'Attention to detail',
        'Premium polishing',
        'Heavy-duty performance',
        'Seamless installation'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Newly requested Steps/Stairs projects
    {
      id: 99,
      imgSrc: getProjectImageUrlByIndex(99),
      title: 'Gray & Black Granite',
      description: 'Contrast-rich gray and black granite steps.',
      fullDescription: 'Gray and black granite steps designed to create a bold, high-contrast feature in entrances and interiors. Durable finishes and precise nosing ensure everyday safety and long-term performance.',
      features: [
        'High-contrast aesthetic',
        'Slip-resistant finish',
        'Precision nosing edges',
        'Low maintenance',
        'Indoor/outdoor suitable'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 100,
      imgSrc: getProjectImageUrlByIndex(100),
      title: 'Red Granite',
      description: 'Striking red granite steps with durable finish.',
      fullDescription: 'Vibrant red granite staircase treads and risers that stand out with rich color and enduring performance. Finished for traction and sealed for protection against stains.',
      features: [
        'Vibrant natural tone',
        'Non-slip surface',
        'Sealed for protection',
        'Weather resistant',
        'Custom sizing available'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 101,
      imgSrc: getProjectImageUrlByIndex(101),
      title: 'Gray Granite',
      description: 'Sleek gray granite steps with uniform grain.',
      fullDescription: 'Sleek gray granite fabricated with consistent thickness and refined edges. Ideal for modern staircases requiring strength, uniformity, and timeless appeal.',
      features: [
        'Uniform grain',
        'Refined edge profiles',
        'Heavy-duty suitable',
        'Low porosity',
        'Easy upkeep'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 102,
      imgSrc: getProjectImageUrlByIndex(102),
      title: 'Viscount White Granite',
      description: 'Elegant Viscount White granite steps with subtle waves.',
      fullDescription: 'Viscount White granite steps featuring flowing gray veining on a white field. Anti-slip finishing and sealing deliver safety, durability, and refined style.',
      features: [
        'Subtle wave-like veining',
        'Non-slip finish',
        'Sealed for longevity',
        'Indoor/outdoor ready',
        'Premium polish option'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 103,
      imgSrc: getProjectImageUrlByIndex(103),
      title: 'Gray Granite',
      description: 'Durable gray granite steps for modern spaces.',
      fullDescription: 'Modern gray granite steps with reliable traction and precision machining. Built for high-traffic use with a clean, contemporary aesthetic.',
      features: [
        'Precision machining',
        'Traction-ready surface',
        'Weather tolerant',
        'Consistent thickness',
        'Commercial-grade strength'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 104,
      imgSrc: getProjectImageUrlByIndex(104),
      title: 'Gray Granite',
      description: 'Neutral gray granite steps with refined edges.',
      fullDescription: 'Neutral-tone gray granite stair treads and risers with refined edge detailing. A versatile choice that suits both minimalist and classic designs.',
      features: [
        'Neutral modern tone',
        'Refined edge detailing',
        'Sealed protection',
        'Low maintenance',
        'Custom profiles available'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 105,
      imgSrc: getProjectImageUrlByIndex(105),
      title: 'Pure White Granite',
      description: 'Crisp pure white granite steps for bright spaces.',
      fullDescription: 'Pure white granite steps that brighten interiors and emphasize clean lines. Finished for traction and sealed for easy care and stain resistance.',
      features: [
        'Bright, clean aesthetic',
        'Non-slip finish',
        'Stain resistant',
        'Easy to clean',
        'Refined edge profiles'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 106,
      imgSrc: getProjectImageUrlByIndex(106),
      title: 'Black Granite',
      description: 'Deep black granite steps with premium finish.',
      fullDescription: 'Deep black granite steps with polished or flamed finishes for style and safety. Engineered for longevity and low maintenance across residential and commercial use.',
      features: [
        'Polished/flamed options',
        'High-density stone',
        'Low maintenance',
        'Durable and stable',
        'Indoor/outdoor ready'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 107,
      imgSrc: getProjectImageUrlByIndex(107),
      title: 'Yellow Granite',
      description: 'Warm yellow granite steps with natural character.',
      fullDescription: 'Warm-toned yellow granite with expert nosing and protective sealing. Ideal for terraces, entries, and feature staircases with inviting character.',
      features: [
        'Warm natural tone',
        'Protective sealing',
        'Expert nosing finish',
        'Outdoor friendly',
        'Low upkeep'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 116,
      imgSrc: getProjectImageUrlByIndex(116),
      title: 'Black Granite',
      description: 'Classic black granite steps for timeless style.',
      fullDescription: 'Classic black granite staircase solution with durable, slip-resistant finishing. Suited for both modern and traditional environments.',
      features: [
        'Timeless aesthetic',
        'Slip-resistant',
        'Sealed protection',
        'Precision cut edges',
        'Heavy-duty performance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 119,
      imgSrc: getProjectImageUrlByIndex(119),
      title: 'Black Granite',
      description: 'Refined black granite steps with clean lines.',
      fullDescription: 'Refined black granite treads and risers with crisp jointing and stable performance. Finished for traction and easy maintenance.',
      features: [
        'Crisp jointing',
        'Traction-ready finish',
        'Low porosity',
        'Easy maintenance',
        'Custom sizes available'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 136,
      imgSrc: getProjectImageUrlByIndex(136),
      title: 'White Grinate with Profile Light',
      description: 'Illuminated white granite steps with integrated profile.',
      fullDescription: 'White granite steps integrated with LED profile lighting for enhanced safety and a premium ambiance. Clean channels and concealed wiring for a seamless look.',
      features: [
        'Integrated LED profile',
        'Precision light channels',
        'Enhanced night safety',
        'Premium visual effect',
        'Clean cable management'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 137,
      imgSrc: getProjectImageUrlByIndex(137),
      title: 'White Granite',
      description: 'Crisp white granite steps with subtle veining.',
      fullDescription: 'White granite staircase with refined edge profiles and sealed, easy-care surfaces. Enhances light and spatial clarity in modern interiors.',
      features: [
        'Refined edge profiles',
        'Sealed surfaces',
        'Brightens interiors',
        'Durable and stable',
        'Low maintenance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 138,
      imgSrc: getProjectImageUrlByIndex(138),
      title: 'Golden & Gray Granite',
      description: 'Granite steps blending golden and gray tones.',
      fullDescription: 'A sophisticated blend of golden and gray granite tones for feature staircases. Balanced color, precise cuts, and long-term durability.',
      features: [
        'Balanced dual-tone look',
        'Precision cutting',
        'Sealed protection',
        'Indoor/outdoor suitable',
        'Custom fabrication'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 139,
      imgSrc: getProjectImageUrlByIndex(139),
      title: 'Red & Gray Granite',
      description: 'Contrasting red and gray granite steps.',
      fullDescription: 'Red and gray granite combination across treads and risers for a striking architectural statement. Durable finishes and precise jointing throughout.',
      features: [
        'High contrast design',
        'Durable finishes',
        'Precise jointing',
        'Weather tolerant',
        'Custom sizing'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 140,
      imgSrc: getProjectImageUrlByIndex(140),
      title: 'Gray Granite',
      description: 'Reliable gray granite steps for heavy use.',
      fullDescription: 'Reliable gray granite steps designed for heavy footfall with slip-resistant surfaces and consistent thickness for smooth installation.',
      features: [
        'Slip-resistant',
        'Consistent thickness',
        'Heavy-duty performance',
        'Refined edges',
        'Low maintenance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 141,
      imgSrc: getProjectImageUrlByIndex(141),
      title: 'Gray Granite',
      description: 'Neutral gray granite steps with clean lines.',
      fullDescription: 'Neutral gray granite with clean lines and durable finishing. Suitable for minimalist interiors and outdoor stairways alike.',
      features: [
        'Clean-line aesthetic',
        'Durable finishing',
        'Weather resistant',
        'Easy upkeep',
        'Custom profiles'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 142,
      imgSrc: getProjectImageUrlByIndex(142),
      title: 'Pure White Granite',
      description: 'Pure white granite steps for bright interiors.',
      fullDescription: 'Pure white granite steps that maximize brightness and spatial clarity. Non-slip finishing and sealing provide safety and protection.',
      features: [
        'Bright pure tone',
        'Non-slip finish',
        'Sealed for protection',
        'Refined edges',
        'Easy maintenance'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 145,
      imgSrc: getProjectImageUrlByIndex(145),
      title: 'Gray Granite',
      description: 'Gray granite steps tailored to specification.',
      fullDescription: 'Project-specific gray granite steps with attention to detail from selection to final finish. Built for longevity and everyday safety.',
      features: [
        'Project-tailored sizes',
        'Attention to detail',
        'Premium finishing',
        'Stable performance',
        'Seamless installation'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Kitchen design projects
    {
      id: 2001,
      imgSrc: getProjectImageUrlByIndex(1),
      title: 'Travertine Kitchen',
      description: 'Warm travertine surfaces tailored for kitchen spaces.',
      fullDescription: 'A travertine kitchen design featuring durable, sealed surfaces that balance natural texture with everyday practicality. Precision edge detailing and stain-resistant treatment ensure longevity and easy care.',
      features: [
        'Sealed, stain-resistant finish',
        'Precision edge detailing',
        'Natural textured look',
        'Durable for daily use',
        'Custom countertop profiles'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2002,
      imgSrc: getProjectImageUrlByIndex(2),
      title: 'Golden Kitchen',
      description: 'Golden-toned stone for luxurious kitchen finishes.',
      fullDescription: 'A kitchen concept with golden-toned stone surfaces that create a warm, luxurious aesthetic. Finished for traction and easy maintenance, ideal for countertops and islands.',
      features: [
        'Warm golden tone',
        'Easy maintenance',
        'Refined edges',
        'Durable sealing',
        'Custom fabrication'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2003,
      imgSrc: getProjectImageUrlByIndex(3),
      title: 'White Granite Kitchen',
      description: 'Bright white granite kitchen with premium finish.',
      fullDescription: 'A white granite kitchen design that enhances light and clarity. Non-porous sealing supports hygiene, while precise jointing delivers a seamless look across countertops and backsplashes.',
      features: [
        'Hygienic sealed surfaces',
        'Bright, clean aesthetic',
        'Precise jointing',
        'Low porosity',
        'Custom sink cutouts'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2035,
      imgSrc: getProjectImageUrlByIndex(35),
      title: 'Granite Kitchen',
      description: 'Neutral granite kitchen with refined durability.',
      fullDescription: 'A granite kitchen concept emphasizing everyday durability and refined edge profiles. Resistant to wear, staining, and heat—ideal for high-use cooking environments.',
      features: [
        'Heat and stain resistant',
        'Refined edge profiles',
        'Durable everyday use',
        'Low maintenance',
        'Custom countertop layouts'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2128,
      imgSrc: getProjectImageUrlByIndex(128),
      title: 'Quartz Kitchen',
      description: 'Engineered quartz kitchen surfaces with clean lines.',
      fullDescription: 'Quartz kitchen surfaces offer consistent color, non-porous hygiene, and low maintenance. Custom fabrication provides seamless backsplashes and integrated islands.',
      features: [
        'Non-porous hygiene',
        'Consistent color and grain',
        'Easy cleaning',
        'Seamless backsplash options',
        'Custom fabrication'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 2134,
      imgSrc: getProjectImageUrlByIndex(134),
      title: 'Kitchen Design',
      description: 'Balanced kitchen design with premium stone surfaces.',
      fullDescription: 'A balanced kitchen design featuring premium stone selections tailored to your space. Durable finishes, practical layouts, and precision installation deliver everyday performance and timeless style.',
      features: [
        'Premium stone selection',
        'Durable finishes',
        'Practical layout focus',
        'Precision installation',
        'Custom profiles and edges'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Washroom design projects
    {
      id: 3006,
      imgSrc: getProjectImageUrlByIndex(6),
      title: 'White Venite ',
      description: 'Bright Venite white surfaces for hygienic washrooms.',
      fullDescription: 'A Venite white washroom concept with sealed, non-porous surfaces for superior hygiene. Refined edge profiles and moisture-resistant finishing deliver everyday durability and easy cleaning.',
      features: [
        'Non-porous sealed surfaces',
        'Moisture-resistant finish',
        'Refined edge profiles',
        'Easy to clean',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3033,
      imgSrc: getProjectImageUrlByIndex(33),
      title: 'Washroom Vanity',
      description: 'Refined vanity design with sealed surfaces.',
      fullDescription: 'A clean washroom vanity concept with sealed, non-porous surfaces for superior hygiene and easy maintenance. Balanced proportions and precise detailing elevate everyday use.',
      features: [
        'Non-porous sealed surfaces',
        'Hygienic and durable',
        'Refined detailing',
        'Moisture resistant',
        'Everyday practicality'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3040,
      imgSrc: getProjectImageUrlByIndex(40),
      title: 'Washroom Vanity',
      description: 'Balanced vanity design with premium finish.',
      fullDescription: 'A premium washroom vanity installation featuring sealed stone surfaces and precise edge profiles. Designed for longevity, moisture resistance, and everyday ease of care.',
      features: [
        'Premium finish',
        'Sealed stone',
        'Moisture resistance',
        'Precise profiles',
        'Long-term durability'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3123,
      imgSrc: getProjectImageUrlByIndex(123),
      title: 'Washroom Vanity',
      description: 'Modern vanity with clean, sealed surfaces.',
      fullDescription: 'A modern washroom vanity design focusing on clean lines, sealed non-porous stone, and practical storage. Built for daily use with refined craftsmanship.',
      features: [
        'Clean modern lines',
        'Non-porous stone',
        'Practical storage',
        'Refined craftsmanship',
        'Easy maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Step design - additional
    {
      id: 129,
      imgSrc: getProjectImageUrlByIndex(129),
      title: 'White Steps with Profile Light',
      description: 'Illuminated white steps with integrated profile lighting.',
      fullDescription: 'Precision-crafted white stone steps integrated with profile lighting channels for safety and ambient glow. Finished for traction and sealed for protection.',
      features: [
        'Integrated profile lighting',
        'Traction finish',
        'Sealed protection',
        'Clean edge profiles',
        'Durable construction'
      ],
      isSteps: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Kitchen design - additional counter
    {
      id: 2143,
      imgSrc: getProjectImageUrlByIndex(143),
      title: 'White Counter',
      description: 'White stone countertop with premium finish.',
      fullDescription: 'A white stone countertop designed for kitchens or service areas, featuring sealed, stain-resistant surfaces and refined edge detailing for a seamless look.',
      features: [
        'Sealed stain resistance',
        'Refined edges',
        'Seamless appearance',
        'Durable daily use',
        'Custom fabrication'
      ],
      isKitchen: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Floor design projects
    {
      id: 5042,
      imgSrc: getProjectImageUrlByIndex(42),
      title: 'Gray Polished Floor',
      description: 'Gray polished stone floor with sealed finish.',
      fullDescription: 'A gray polished stone flooring solution featuring sealed, easy-clean surfaces and consistent thickness for level installation across living or commercial spaces.',
      features: [
        'Polished finish',
        'Sealed for protection',
        'Consistent thickness',
        'Easy to clean',
        'Durable underfoot'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5043,
      imgSrc: getProjectImageUrlByIndex(43),
      title: 'Gray Polished Floor',
      description: 'Polished gray floor with refined profiles.',
      fullDescription: 'Refined polished gray stone flooring, sealed against stains and moisture. Precision fabrication supports clean joints and a uniform appearance.',
      features: [
        'Refined polish',
        'Stain/moisture resistance',
        'Clean joints',
        'Uniform appearance',
        'Precision fabrication'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5069,
      imgSrc: getProjectImageUrlByIndex(69),
      title: 'Polished Floor',
      description: 'Polished stone floor for high-use areas.',
      fullDescription: 'A polished stone flooring design suitable for high-use areas. Sealed surfaces resist wear and stains, with precise leveling for a smooth result.',
      features: [
        'High-use durability',
        'Sealed surface',
        'Smooth finish',
        'Precise leveling',
        'Low maintenance'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5081,
      imgSrc: getProjectImageUrlByIndex(81),
      title: 'White Floor',
      description: 'Bright white polished stone floor.',
      fullDescription: 'Bright white stone flooring that enhances spatial clarity. Sealed and polished to balance elegance with day-to-day practicality and easy upkeep.',
      features: [
        'Bright aesthetic',
        'Sealed polish',
        'Easy upkeep',
        'Durable surface',
        'Versatile application'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5121,
      imgSrc: getProjectImageUrlByIndex(121),
      title: 'Marble Floor Design',
      description: 'Marble floor with premium finish and sealing.',
      fullDescription: 'A marble floor design featuring premium finishing and protection. Fabricated for consistent thickness, clean joints, and a timeless aesthetic.',
      features: [
        'Premium finish',
        'Protected surface',
        'Consistent thickness',
        'Clean jointing',
        'Timeless look'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 5125,
      imgSrc: getProjectImageUrlByIndex(125),
      title: 'Floor Design',
      description: 'Durable polished stone floor with sealed surface.',
      fullDescription: 'Durable polished stone flooring with a sealed surface for stain and moisture resistance. Designed for a uniform, premium appearance across wide areas.',
      features: [
        'Durable construction',
        'Sealed surface',
        'Uniform appearance',
        'Premium look',
        'Low maintenance'
      ],
      isFloor: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    // Table design projects
    {
      id: 4010,
      imgSrc: getProjectImageUrlByIndex(10),
      title: 'Travertine Table',
      description: 'Travertine table with sealed, durable finish.',
      fullDescription: 'A handcrafted travertine table sealed to resist stains and moisture. Balanced natural texture, precision edges, and everyday durability make it ideal for living rooms and entrances.',
      features: [
        'Sealed stain-resistant surface',
        'Precision edges',
        'Natural travertine texture',
        'Durable construction',
        'Custom sizing options'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4011,
      imgSrc: getProjectImageUrlByIndex(11),
      title: 'Travertine Table',
      description: 'Classic travertine table with refined profile.',
      fullDescription: 'Classic travertine table featuring refined edge profiles and a sealed, easy-care finish. Ideal for coffee, side, or accent purposes with timeless appeal.',
      features: [
        'Refined edge profiles',
        'Easy-care sealing',
        'Versatile use',
        'Timeless look',
        'Quality craftsmanship'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4012,
      imgSrc: getProjectImageUrlByIndex(12),
      title: 'Travertine Table',
      description: 'Neutral travertine table with balanced texture.',
      fullDescription: 'A neutral-toned travertine table with balanced texture and sealed finish to resist stains. Compatible with modern and traditional spaces.',
      features: [
        'Neutral-toned stone',
        'Sealed finish',
        'Balanced texture',
        'Modern/traditional fit',
        'Long-lasting performance'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4013,
      imgSrc: getProjectImageUrlByIndex(13),
      title: 'Marble Table',
      description: 'Elegant marble table with premium polish.',
      fullDescription: 'An elegant marble table featuring premium polish and precise fabrication. Sealed for protection and designed to elevate living or reception areas.',
      features: [
        'Premium polish',
        'Precise fabrication',
        'Sealed protection',
        'Elevates interiors',
        'Custom profiles available'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4014,
      imgSrc: getProjectImageUrlByIndex(14),
      title: 'Travertine Table',
      description: 'Textured travertine table with robust build.',
      fullDescription: 'Robust travertine table with a textured surface, sealed for daily use. Balanced proportions and craftsmanship ensure stability and long-term durability.',
      features: [
        'Textured surface',
        'Daily-use sealing',
        'Stable proportions',
        'Quality build',
        'Long-term durability'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4015,
      imgSrc: getProjectImageUrlByIndex(15),
      title: 'Marble Table',
      description: 'Polished marble table with refined edges.',
      fullDescription: 'A polished marble table with refined edges and sealed surfaces for protection. Ideal for center tables or accent pieces with premium stone character.',
      features: [
        'Polished finish',
        'Refined edges',
        'Protected surface',
        'Premium character',
        'Center/accent use'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4022,
      imgSrc: getProjectImageUrlByIndex(22),
      title: 'Marble Table',
      description: 'Marble table with seamless finish and stability.',
      fullDescription: 'Seamless marble table designed for stability and aesthetic clarity. Sealed against stains and crafted with consistent thickness and edge integrity.',
      features: [
        'Seamless finish',
        'Stable build',
        'Consistent thickness',
        'Edge integrity',
        'Stain protection'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 4032,
      imgSrc: getProjectImageUrlByIndex(32),
      title: 'Central Table',
      description: 'Central table in premium stone with balanced design.',
      fullDescription: 'A central table crafted in premium stone with balanced design and clean profiles. Sealed surfaces resist stains and support everyday use in living spaces.',
      features: [
        'Balanced design',
        'Clean profiles',
        'Sealed surfaces',
        'Everyday durability',
        'Premium stone selection'
      ],
      isTable: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3008,
      imgSrc: getProjectImageUrlByIndex(8),
      title: 'White Venite',
      description: 'Crisp white Venite washroom with premium finish.',
      fullDescription: 'Crisp white Venite surfaces with non-slip treatment in wet areas. Protective sealing and precise jointing ensure long-term performance and hygiene.',
      features: [
        'Non-slip treatment',
        'Protective sealing',
        'Precise jointing',
        'Hygienic surfaces',
        'Low maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3021,
      imgSrc: getProjectImageUrlByIndex(21),
      title: 'Travertine Viente ',
      description: 'Warm travertine Viente textures for washrooms.',
      fullDescription: 'A washroom design featuring travertine Viente textures. Sealed, moisture-resistant finishes and refined profiles provide a natural, warm aesthetic with everyday practicality.',
      features: [
        'Sealed travertine surfaces',
        'Moisture-resistant',
        'Warm natural tone',
        'Refined profiles',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3023,
      imgSrc: getProjectImageUrlByIndex(23),
      title: 'Travertine Viente ',
      description: 'Natural travertine Viente washroom surfaces.',
      fullDescription: 'Travertine Viente surfaces with protective sealing and non-slip treatment in wet zones. Combines natural texture with modern hygiene and durability.',
      features: [
        'Protective sealing',
        'Non-slip in wet zones',
        'Natural texture',
        'Durable daily use',
        'Custom edge profiles'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3045,
      imgSrc: getProjectImageUrlByIndex(45),
      title: 'Washroom Design',
      description: 'Balanced washroom design with stone surfaces.',
      fullDescription: 'A balanced washroom concept with premium stone surfaces tailored to wet areas. Sealed, easy-clean finishes and precise installation ensure long-term performance.',
      features: [
        'Premium stone selection',
        'Sealed, easy-clean',
        'Precise installation',
        'Moisture-resistant',
        'Custom profiles'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3046,
      imgSrc: getProjectImageUrlByIndex(46),
      title: 'Washroom Design',
      description: 'Refined stone surfaces for modern washrooms.',
      fullDescription: 'Modern washroom design using refined stone surfaces with protective sealing and non-slip treatment. Built for hygiene, durability, and easy maintenance.',
      features: [
        'Protective sealing',
        'Non-slip treatment',
        'Hygienic surfaces',
        'Durable and stable',
        'Low maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3047,
      imgSrc: getProjectImageUrlByIndex(47),
      title: 'Viente Washroom',
      description: 'Viente stone washroom with durable finish.',
      fullDescription: 'Viente stone washroom surfaces with sealed protection and refined edges. Designed for wet environments with easy-care maintenance.',
      features: [
        'Sealed protection',
        'Refined edges',
        'Wet-area safe',
        'Easy-care',
        'Custom fabrication'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3048,
      imgSrc: getProjectImageUrlByIndex(48),
      title: 'Viente Washroom',
      description: 'Durable Viente washroom surfaces.',
      fullDescription: 'Washroom concept with Viente stone surfaces sealed for moisture resistance. Non-slip finishing applied in wet zones for safety.',
      features: [
        'Moisture resistance',
        'Non-slip wet zones',
        'Hygienic sealing',
        'Durable use',
        'Refined profiles'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3049,
      imgSrc: getProjectImageUrlByIndex(49),
      title: 'Washroom Design',
      description: 'Stone washroom with practical durability.',
      fullDescription: 'Practical washroom design with sealed, easy-clean stone surfaces and precise installation. Built for daily use and modern aesthetics.',
      features: [
        'Sealed, easy-clean',
        'Precise installation',
        'Durable daily use',
        'Modern aesthetic',
        'Custom profiles'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3051,
      imgSrc: getProjectImageUrlByIndex(51),
      title: 'White Viente Washroom',
      description: 'White Viente surfaces for clean washrooms.',
      fullDescription: 'White Viente washroom surfaces with protective sealing and crisp jointing. Enhances brightness and hygiene in modern bathrooms.',
      features: [
        'Protective sealing',
        'Crisp jointing',
        'Bright, clean look',
        'Hygienic finish',
        'Low maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3052,
      imgSrc: getProjectImageUrlByIndex(52),
      title: 'Black Viente Washroom',
      description: 'Black Viente surfaces with luxury finish.',
      fullDescription: 'Black Viente washroom design featuring sealed, non-porous surfaces and anti-slip finishing in wet areas for safety and style.',
      features: [
        'Non-porous surfaces',
        'Anti-slip wet zones',
        'Sealed protection',
        'Luxury aesthetic',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3053,
      imgSrc: getProjectImageUrlByIndex(53),
      title: 'White viente',
      description: 'Pure white stone surfaces for washrooms.',
      fullDescription: 'A pure white washroom concept with sealed, easy-clean surfaces and refined edges. Designed for brightness, hygiene, and longevity.',
      features: [
        'Sealed, easy-clean',
        'Refined edges',
        'Bright aesthetic',
        'Hygienic finish',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3054,
      imgSrc: getProjectImageUrlByIndex(54),
      title: 'White Viente',
      description: 'White stone washroom with durable finish.',
      fullDescription: 'White washroom surfaces sealed for protection and easy maintenance. Non-slip treatment applied for safety in wet environments.',
      features: [
        'Protective sealing',
        'Non-slip finish',
        'Easy maintenance',
        'Refined profiles',
        'Clean aesthetic'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3055,
      imgSrc: getProjectImageUrlByIndex(55),
      title: 'Black & White viente',
      description: 'Contrasting black and white washroom surfaces.',
      fullDescription: 'A high-contrast washroom concept combining black and white stone surfaces. Sealed and non-slip finishes deliver safety and style.',
      features: [
        'High-contrast look',
        'Sealed protection',
        'Non-slip wet zones',
        'Durable daily use',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3056,
      imgSrc: getProjectImageUrlByIndex(56),
      title: 'Black & White viente',
      description: 'Balanced black and white washroom surfaces.',
      fullDescription: 'Washroom design featuring balanced black and white stone surfaces with protective sealing and non-slip finishes for wet areas.',
      features: [
        'Balanced aesthetic',
        'Protective sealing',
        'Non-slip wet zones',
        'Hygienic surfaces',
        'Low maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3057,
      imgSrc: getProjectImageUrlByIndex(57),
      title: 'White viente',
      description: 'Clean white stone washroom concept.',
      fullDescription: 'Clean white stone surfaces sealed and refined for modern bathrooms. Designed for brightness, hygiene, and long-term durability.',
      features: [
        'Bright, clean look',
        'Sealed surfaces',
        'Refined edges',
        'Durable daily use',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3059,
      imgSrc: getProjectImageUrlByIndex(59),
      title: 'White viente',
      description: 'White washroom surfaces with sealed finish.',
      fullDescription: 'White stone washroom surfaces sealed for moisture resistance and hygiene. Non-slip treatment and crisp jointing in wet areas.',
      features: [
        'Moisture resistance',
        'Non-slip treatment',
        'Crisp jointing',
        'Hygienic surfaces',
        'Easy maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3061,
      imgSrc: getProjectImageUrlByIndex(61),
      title: 'Black & White viente',
      description: 'Contrast-rich black & white washroom.',
      fullDescription: 'Contrast-rich washroom using black and white stone surfaces with sealed protection and non-slip finish for safe daily use.',
      features: [
        'Contrast aesthetic',
        'Sealed protection',
        'Non-slip finish',
        'Durable performance',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3063,
      imgSrc: getProjectImageUrlByIndex(63),
      title: 'Pure White viente',
      description: 'Pure white stone washroom surfaces.',
      fullDescription: 'Pure white washroom design featuring sealed, non-porous surfaces and refined edge profiles for modern hygiene and brightness.',
      features: [
        'Non-porous hygiene',
        'Sealed protection',
        'Refined edges',
        'Bright aesthetic',
        'Easy cleaning'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3064,
      imgSrc: getProjectImageUrlByIndex(64),
      title: 'Pure White viente',
      description: 'Bright pure white washroom concept.',
      fullDescription: 'Bright pure white washroom with sealed surfaces and non-slip treatment in wet zones. Easy maintenance and long-term durability.',
      features: [
        'Sealed, easy-clean',
        'Non-slip wet zones',
        'Bright, clean look',
        'Durable daily use',
        'Refined profiles'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3066,
      imgSrc: getProjectImageUrlByIndex(66),
      title: 'Pure White viente',
      description: 'Pure white stone with hygienic finish.',
      fullDescription: 'Pure white stone surfaces sealed and refined for modern washrooms. Emphasizes hygiene, brightness, and everyday durability.',
      features: [
        'Hygienic sealed finish',
        'Refined edges',
        'Bright aesthetic',
        'Durable daily use',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3078,
      imgSrc: getProjectImageUrlByIndex(78),
      title: 'White & Black Spots Washroom',
      description: 'Spotted white & black stone surfaces.',
      fullDescription: 'Washroom concept featuring white and black spotted stone surfaces with sealed protection and non-slip treatment for wet areas.',
      features: [
        'Sealed protection',
        'Non-slip finish',
        'Distinctive spotted look',
        'Durable performance',
        'Easy maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3115,
      imgSrc: getProjectImageUrlByIndex(115),
      title: 'White viente',
      description: 'Crisp white stone washroom surfaces.',
      fullDescription: 'Crisp white washroom surfaces sealed and refined for modern hygiene and brightness. Non-slip treatment applied in wet areas.',
      features: [
        'Sealed surfaces',
        'Non-slip wet zones',
        'Bright aesthetic',
        'Hygienic finish',
        'Low maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3120,
      imgSrc: getProjectImageUrlByIndex(120),
      title: 'Black Luxury Washroom',
      description: 'Luxury black stone washroom surfaces.',
      fullDescription: 'Luxury black washroom featuring sealed, non-porous surfaces with refined edges and non-slip finishing in wet areas for safety.',
      features: [
        'Luxury black aesthetic',
        'Non-porous hygiene',
        'Non-slip finish',
        'Refined edge profiles',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3118,
      imgSrc: getProjectImageUrlByIndex(118),
      title: 'Black Luxury Washroom',
      description: 'Premium black washroom concept.',
      fullDescription: 'Premium black washroom concept with sealed, hygienic surfaces and non-slip treatment in wet zones. Crisp jointing and refined profiles.',
      features: [
        'Sealed, hygienic surfaces',
        'Non-slip wet zones',
        'Crisp jointing',
        'Refined profiles',
        'Durable performance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3117,
      imgSrc: getProjectImageUrlByIndex(117),
      title: 'Black Luxury Washroom',
      description: 'Luxury black stone washroom surfaces.',
      fullDescription: 'Luxury black washroom surfaces sealed for protection and refined for modern aesthetics. Non-slip finishing applied in wet areas.',
      features: [
        'Protective sealing',
        'Non-slip finish',
        'Luxury aesthetic',
        'Easy upkeep',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3130,
      imgSrc: getProjectImageUrlByIndex(130),
      title: 'Black Washroom',
      description: 'Deep black stone washroom surfaces.',
      fullDescription: 'Deep black washroom surfaces sealed and refined for modern bathrooms. Non-slip finishing in wet zones and crisp jointing.',
      features: [
        'Sealed protection',
        'Non-slip wet zones',
        'Crisp jointing',
        'Refined edges',
        'Durable performance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3133,
      imgSrc: getProjectImageUrlByIndex(133),
      title: 'Gray Matte Washroom',
      description: 'Matte gray stone washroom surfaces.',
      fullDescription: 'Gray matte washroom concept featuring sealed, easy-clean surfaces with a refined, contemporary aesthetic. Non-slip finishing applied in wet areas.',
      features: [
        'Matte gray aesthetic',
        'Sealed, easy-clean',
        'Non-slip wet zones',
        'Refined profiles',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3132,
      imgSrc: getProjectImageUrlByIndex(132),
      title: 'Gray Matte Washroom',
      description: 'Contemporary gray matte washroom.',
      fullDescription: 'Contemporary gray matte washroom with sealed, hygienic surfaces and non-slip finish in wet zones. Designed for durability and easy care.',
      features: [
        'Hygienic sealing',
        'Non-slip finish',
        'Matte aesthetic',
        'Durable performance',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3131,
      imgSrc: getProjectImageUrlByIndex(131),
      title: 'Chocolate Washroom',
      description: 'Warm chocolate-toned stone surfaces.',
      fullDescription: 'Warm chocolate-toned washroom surfaces sealed and refined for modern spaces. Non-slip treatment in wet areas and easy maintenance.',
      features: [
        'Warm chocolate tone',
        'Sealed protection',
        'Non-slip wet zones',
        'Refined edges',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3135,
      imgSrc: getProjectImageUrlByIndex(135),
      title: 'White viente',
      description: 'Premium white washroom stone surfaces.',
      fullDescription: 'Premium white washroom concept with sealed, non-porous surfaces and crisp jointing. Built for hygiene, brightness, and daily durability.',
      features: [
        'Non-porous hygiene',
        'Crisp jointing',
        'Bright, clean look',
        'Durable performance',
        'Easy maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3144,
      imgSrc: getProjectImageUrlByIndex(144),
      title: 'Luxury Granite Washroom',
      description: 'Luxurious granite finish washroom surfaces.',
      fullDescription: 'Luxury washroom featuring granite finish surfaces with sealed protection, refined profiles, and non-slip treatment in wet zones.',
      features: [
        'Luxury granite finish',
        'Sealed protection',
        'Non-slip wet zones',
        'Refined edge profiles',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3146,
      imgSrc: getProjectImageUrlByIndex(146),
      title: 'Gray Washroom',
      description: 'Neutral gray stone washroom surfaces.',
      fullDescription: 'Neutral gray washroom surfaces with sealed, easy-clean finish and refined edge profiles. Non-slip treatment in wet areas for safety.',
      features: [
        'Sealed, easy-clean',
        'Non-slip finish',
        'Refined edges',
        'Durable daily use',
        'Modern aesthetic'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3148,
      imgSrc: getProjectImageUrlByIndex(148),
           title: 'Luxury Washroom Design',
      description: 'Luxury washroom with premium stone surfaces.',
      fullDescription: 'Luxury washroom design emphasizing premium stone selections, refined profiles, sealed protection, and non-slip treatment for wet areas.',
      features: [
        'Premium stone selection',
        'Refined profiles',
        'Sealed protection',
        'Non-slip wet zones',
        'Easy maintenance'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3149,
      imgSrc: getProjectImageUrlByIndex(149),
      title: 'Luxury Washroom Design',
      description: 'Luxury washroom concept for modern spaces.',
      fullDescription: 'Modern luxury washroom concept featuring premium stone surfaces, sealed protection, and non-slip finishing in wet zones.',
      features: [
        'Premium stone surfaces',
        'Sealed protection',
        'Non-slip finish',
        'Refined edges',
        'Durable daily use'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
    {
      id: 3150,
      imgSrc: getProjectImageUrlByIndex(150),
      title: 'Luxury Washroom Design',
      description: 'Premium luxury washroom surfaces and finishes.',
      fullDescription: 'A luxury washroom design with premium stone selections, sealed hygienic surfaces, refined profiles, and non-slip finishing in wet areas.',
      features: [
        'Premium selections',
        'Sealed, hygienic surfaces',
        'Non-slip wet zones',
        'Refined profiles',
        'Easy upkeep'
      ],
      isWashroom: true,
      btnText: 'Explore More',
      productImage: homeImg,
    },
  ];

  // Build dynamic cards from imported projectImages and append after the first nine
  const dynamicProjectCards = projectImages
    .filter((entry) =>
      !stepsIndices.has(entry.index) &&
      !kitchenIndices.has(entry.index) &&
      !washroomIndices.has(entry.index) &&
      !tableIndices.has(entry.index) &&
      !floorIndices.has(entry.index) &&
      !mediaWallIndices.has(entry.index)
    )
    .map((entry) => ({
      id: 1000 + entry.index,
      imgSrc: entry.url,
      title: `Project ${entry.index}`,
      description: 'Recent project photo from our portfolio.',
      fullDescription: 'A recent completed project showcasing our material quality and craftsmanship.',
      features: [],
      btnText: 'Explore More',
      productImage: homeImg,
    }));

  const cards = [...baseCards, ...dynamicProjectCards];

  // Filter projects by search and selected filter (after cards are declared)
  const filteredCards = React.useMemo(() => {
    return cards.filter((card) => {
      const q = (searchTerm || '').toLowerCase();
      const title = (card.title || '').toLowerCase();
      const desc = (card.description || '').toLowerCase();
      const matchesSearch = !q || title.includes(q) || desc.includes(q);
      const category = card.isSteps
        ? 'steps'
        : (card.isKitchen
          ? 'kitchen'
          : (card.isWashroom
            ? 'vanity'
            : (card.isTable
              ? 'table'
              : (card.isFloor
                ? 'floor'
                : (card.isMediaWall ? 'mediawall' : getProjectCategory(card.title))))));
      const matchesFilter = viewFilter === 'all' || category === viewFilter;
      return matchesSearch && matchesFilter;
    });
  }, [cards, searchTerm, viewFilter]);

  const totalResults = filteredCards.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  // Slice current page items
  const currentProjects = React.useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCards.slice(startIndex, endIndex);
  }, [filteredCards, currentPage, pageSize]);

  // Showing range
  const showingFrom = totalResults > 0 ? currentPage * pageSize + 1 : 0;
  const showingTo = Math.min((currentPage + 1) * pageSize, totalResults);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: document.querySelector('.pd-related-products').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: document.querySelector('.pd-related-products').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.querySelector('.pd-related-products').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Generate page numbers (same style as Marble)
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        for (let i = 0; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pages.push(0);
        pages.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

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
                  {(selectedProject.isSteps || /step|stair/i.test(selectedProject.title)) ? 'Stairs & Steps' :
                   (selectedProject.isKitchen || /kitchen/i.test(selectedProject.title)) ? 'Kitchen Design' :
                   (selectedProject.isWashroom || /washroom|vanity/i.test(selectedProject.title)) ? 'Vanity Design' :
                   (selectedProject.isFloor || /floor/i.test(selectedProject.title)) ? 'Floor Design' :
                   (selectedProject.isMediaWall || /media\s*wall/i.test(selectedProject.title)) ? 'Media Wall' :
                   (selectedProject.isTable || /table/i.test(selectedProject.title)) ? 'Table Design' :
                   selectedProject.title.includes('Marble') ? 'Premium Stone' : 
                   selectedProject.title.includes('Granite') ? 'Luxury Stone' :
                   selectedProject.title.includes('Travertine') ? 'Classic Stone' :
                   selectedProject.title.includes('Ceramic') ? 'Tile Installation' :
                   selectedProject.title.includes('Quartz') ? 'Engineered Stone' : 'Mosaic Art'}
                </div>
                
                <div className="project-popup-description">
                  <h4 className="project-seo-heading">{selectedProject.title}</h4>
                  <p className="project-seo-paragraph">{selectedProject.fullDescription}</p>
                  
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

        {/* Search + Filter (copied style from Marble page) */}
        <div className="search-filter-container">
          <div className="d-flex flex-row align-items-center justify-content-between w-100 search-filter-row">
            <div className="search-field-container">
              <div className="position-relative search-wrapper">
                <div className="input-group">
                  <span className="input-group-text search-icon">
                    <FaSearch size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search projects by title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {searchTerm && totalResults > 0 && (
                  <div className="search-results-count">
                    {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"
                  </div>
                )}

                {searchTerm && totalResults === 0 && (
                  <div className="search-no-results">
                    Your search for "{searchTerm}" produced 0 results
                  </div>
                )}
              </div>
            </div>

            <div className="filter-dropdown-container">
              <div className="marble-filter-select-wrapper">
                <select
                  className="form-select marble-filter-select"
                  value={viewFilter}
                  onChange={handleViewFilterChange}
                >
                  <option value="all">All Projects</option>
                  <option value="steps">Steps/Stairs</option>
                  <option value="kitchen">Kitchen Designs</option>
                  <option value="vanity">Washroom Designs</option>
                  <option value="table">Table</option>
                  <option value="floor">Floor</option>
                  <option value="mediawall">Media Wall</option>
                </select>
                <div className="marble-select-arrow">
                  <MdExpandMore />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* third section - cards */}
        <div className="product-cards-container py-4">
          <div className="product-cards-row">
            {currentProjects.map((card) => (
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

        {/* Pagination - same style as Marble */}
        {totalResults > pageSize && (
          <div className="marble-pagination-container">
            <div className="marble-pagination-wrapper">
              <div className="marble-pagination-info">
                Showing {showingFrom} to {showingTo} of {totalResults} results
              </div>
              <div className="marble-pagination-controls">
                <button
                  className="marble-pagination-arrow"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <MdKeyboardArrowLeft className="marble-pagination-arrow-icon" />
                </button>
                <div className="marble-pagination-numbers">
                  {generatePageNumbers().map((pageNum, index) => (
                    pageNum === '...'
                      ? (
                        <span key={`dots-${index}`} className="marble-pagination-dots">
                          <BsThreeDots />
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          className={`marble-pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageClick(pageNum)}
                        >
                          {pageNum + 1}
                        </button>
                      )
                  ))}
                </div>
                <button
                  className="marble-pagination-arrow"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                >
                  <MdKeyboardArrowRight className="marble-pagination-arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        )}
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