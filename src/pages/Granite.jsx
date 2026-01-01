import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Navbar from "../pages/Navbar";
import "../Style/Marble.css";

// Granite Collection Images - First batch (existing)
import RED_ALICANTE from '../assets/marble/REDALICANTE.jpg';
import ARABSCATO from '../assets/marble/ARABSCATO1.png';
import BIANCO_CARRARA from '../assets/marble/BIANCOCARRARA.jpg';
import BIANCO_LILAC from '../assets/marble/BIANCO LILAC.png';
import BOTTOCHINO from '../assets/marble/BOTTOCHINO.jpg';
import CALACATTA_BORGHINI from '../assets/marble/CALACATTAORGHINI.png';
import CALACATTA_LINCOLN from '../assets/marble/CALACATTALINCOLN.png';
import CALACATTA_ORO from '../assets/marble/CALACATTAORO.png';
import CAMOFLAGE from '../assets/marble/CAMOFLAGE.png';
import CAPPUCCINO from '../assets/marble/CAPPUCCINO.png';
import BIANCO_CIVIC from '../assets/marble/BIANCO CIVIC.png';
import CALACATTA_PICASSO from '../assets/marble/CALACATTA PICASSO.png';
import CREMA_MARFI from '../assets/marble/CREMA MARFI.png';
import CREMA_ONO from '../assets/marble/CREMA-ONO.png';
import CRYSTAL_EMPERADOR from '../assets/marble/CRYSTAL-EMPERADOR.png';
import DAINO_REALE from '../assets/marble/DAINO-REALE.png';
import DARK_EMPERADOR from '../assets/marble/DARK-EMPERADOR.png';
import ERAMOSA from '../assets/marble/ERAMOSA.png';
import FIRO_DI_BOSCO_LIGHT from '../assets/marble/FIRO DI BOSCO LIGHT.png';
import GOLDEN_SPIDER from '../assets/marble/GOLDEN SPIDER.png';
import ICE_JADE from '../assets/marble/ICE JADE.png';
import MARMARA_WHITE from '../assets/marble/MARMARA WHITE.png';
import NERO_MARQUINA from '../assets/marble/NERO MARQUINA.png';
import NERO_PORTORO from '../assets/marble/NERO PORTORO.png';
import PANDA_WHITE from '../assets/marble/PANDA WHITE.png';
import PERLATO_SICILIA from '../assets/marble/PERLATO-SICILIA.png';
import ROSO_LEVANTO from '../assets/marble/ROSO-LEVANTO.png';
import SALOMIE_CLASSIC from '../assets/marble/SALOMIE CLASSIC.png';
import ST_LAURENT from '../assets/marble/ST LAURENT.png';
import THASSOS from '../assets/marble/THASSOS.png';
import FIOR_DE_PESCO from '../assets/marble/FIOR DE PESCO.png';
import REGGIO_VERDE from '../assets/marble/REGGIO VERDE.png';
import SILVER_WAVE from '../assets/marble/SILVER WAVE.png';
import CALACATTA_CALDIA from '../assets/marble/CALACATTA CALDIA.png';
import PALISANDRO_BLUETTE from '../assets/marble/PALISANDRO BLUETTE.png';
import STATUARIO from '../assets/marble/STATUARIO.png';

// Second batch of granite images from your list
import AZULBAHIA from '../assets/granite/second/AZUL BAHIA.png';
import AZUL_MACUBA from '../assets/granite/second/AZUL MACUBA.png';
import BIANCOSARDO from '../assets/granite/second/BIANCO SARDO.png';
import BLACK_ABSOLUTE from '../assets/granite/second/BLACK-ABSOLUTE.png';
import BLACK_GALAXY from '../assets/granite/second/BLACK-GALAXY.png';
import BLUE_PEARL_GT from '../assets/granite/second/BLUE-PEARL-GT.png';
import CRYSTAL_YELLOW from '../assets/granite/second/CRYSTAL YELLOW.png';
import EMERALD_PEARL from '../assets/granite/second/EMERALD-PEARL.png';
import FAREAST_WHITE from '../assets/granite/second/FAREAST WHITE.png';
import INDIAN_JUPRANA from '../assets/granite/second/INDIAN JUPRANA.png';
import LABRADOR_ANTIQUE from '../assets/granite/second/LABRADOR-ANTIQUE.png';
import LEMURIAN_BLUE from '../assets/granite/second/LEMURIAN BLUE.png';

export default function Granite() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("all");
  
  // State for modal
  const [selectedGranite, setSelectedGranite] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9); // 9 cards per page

  // Granite data - updated with all images including second batch
  const granites = [
    // First batch
    { id: 1, name: "RED ALICANTE", imgSrc: RED_ALICANTE, type: "Red" },
    { id: 2, name: "ARABSCATO", imgSrc: ARABSCATO, type: "White" },
    { id: 3, name: "BIANCO CARRARA", imgSrc: BIANCO_CARRARA, type: "White" },
    { id: 4, name: "BIANCO LILAC", imgSrc: BIANCO_LILAC, type: "White" },
    { id: 5, name: "BOTTOCHINO", imgSrc: BOTTOCHINO, type: "Beige" },
    { id: 6, name: "CALACATTA BORGHINI", imgSrc: CALACATTA_BORGHINI, type: "White" },
    { id: 7, name: "CALACATTA LINCOLN", imgSrc: CALACATTA_LINCOLN, type: "White" },
    { id: 8, name: "CALACATTA ORO", imgSrc: CALACATTA_ORO, type: "White" },
    { id: 9, name: "CAMOFLAGE", imgSrc: CAMOFLAGE, type: "Green" },
    { id: 10, name: "CAPPUCCINO", imgSrc: CAPPUCCINO, type: "Beige" },
    { id: 11, name: "BIANCO CIVIC", imgSrc: BIANCO_CIVIC, type: "White" },
    { id: 12, name: "CALACATTA PICASSO", imgSrc: CALACATTA_PICASSO, type: "White" },
    { id: 13, name: "CREMA MARFI", imgSrc: CREMA_MARFI, type: "Cream" },
    { id: 14, name: "CREMA-ONO", imgSrc: CREMA_ONO, type: "Cream" },
    { id: 15, name: "CRYSTAL-EMPERADOR", imgSrc: CRYSTAL_EMPERADOR, type: "Brown" },
    { id: 16, name: "DAINO-REALE", imgSrc: DAINO_REALE, type: "Beige" },
    { id: 17, name: "DARK-EMPERADOR", imgSrc: DARK_EMPERADOR, type: "Brown" },
    { id: 18, name: "ERAMOSA", imgSrc: ERAMOSA, type: "Grey" },
    { id: 19, name: "FIRO DI BOSCO LIGHT", imgSrc: FIRO_DI_BOSCO_LIGHT, type: "Green" },
    { id: 20, name: "GOLDEN SPIDER", imgSrc: GOLDEN_SPIDER, type: "Gold" },
    { id: 21, name: "ICE JADE", imgSrc: ICE_JADE, type: "Green" },
    { id: 22, name: "MARMARA WHITE", imgSrc: MARMARA_WHITE, type: "White" },
    { id: 23, name: "NERO MARQUINA", imgSrc: NERO_MARQUINA, type: "Black" },
    { id: 24, name: "NERO PORTORO", imgSrc: NERO_PORTORO, type: "Black" },
    { id: 25, name: "PANDA WHITE", imgSrc: PANDA_WHITE, type: "White" },
    { id: 26, name: "PERLATO-SICILIA", imgSrc: PERLATO_SICILIA, type: "Ivory" },
    { id: 27, name: "ROSO-LEVANTO", imgSrc: ROSO_LEVANTO, type: "Pink" },
    { id: 28, name: "SALOMIE CLASSIC", imgSrc: SALOMIE_CLASSIC, type: "Beige" },
    { id: 29, name: "ST LAURENT", imgSrc: ST_LAURENT, type: "Grey" },
    { id: 30, name: "THASSOS", imgSrc: THASSOS, type: "White" },
    { id: 31, name: "FIOR DE PESCO", imgSrc: FIOR_DE_PESCO, type: "Pink" },
    { id: 32, name: "REGGIO VERDE", imgSrc: REGGIO_VERDE, type: "Green" },
    { id: 33, name: "SILVER WAVE", imgSrc: SILVER_WAVE, type: "Grey" },
    { id: 34, name: "CALACATTA CALDIA", imgSrc: CALACATTA_CALDIA, type: "White" },
    { id: 35, name: "PALISANDRO BLUETTE", imgSrc: PALISANDRO_BLUETTE, type: "Blue" },
    { id: 36, name: "STATUARIO", imgSrc: STATUARIO, type: "White" },
    
    // Second batch - added from your list
    { id: 37, name: "AZUL BAHIA", imgSrc: AZULBAHIA, type: "Blue" },
    { id: 38, name: "AZUL MACUBA", imgSrc: AZUL_MACUBA, type: "Blue" },
    { id: 39, name: "BIANCOSARDO", imgSrc: BIANCOSARDO, type: "White" },
    { id: 40, name: "BLACK ABSOLUTE", imgSrc: BLACK_ABSOLUTE, type: "Black" },
    { id: 41, name: "BLACK GALAXY", imgSrc: BLACK_GALAXY, type: "Black" },
    { id: 42, name: "BLUE PEARL GT", imgSrc: BLUE_PEARL_GT, type: "Blue" },
    { id: 43, name: "CRYSTAL YELLOW", imgSrc: CRYSTAL_YELLOW, type: "Yellow" },
    { id: 44, name: "EMERALD PEARL", imgSrc: EMERALD_PEARL, type: "Green" },
    { id: 45, name: "FAREAST WHITE", imgSrc: FAREAST_WHITE, type: "White" },
    { id: 46, name: "INDIAN JUPRANA", imgSrc: INDIAN_JUPRANA, type: "Multi" },
    { id: 47, name: "LABRADOR ANTIQUE", imgSrc: LABRADOR_ANTIQUE, type: "Blue" },
    { id: 48, name: "LEMURIAN BLUE", imgSrc: LEMURIAN_BLUE, type: "Blue" },
  ];

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  // Handler for filter dropdown change
  const handleViewFilterChange = (event) => {
    setViewFilter(event.target.value);
    setCurrentPage(0); // Reset to first page when filtering
  };

  // Filter granites based on search term and filter
  const filteredGranites = useMemo(() => {
    return granites.filter(granite => {
      const matchesSearch = granite.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = viewFilter === "all" || granite.type.toLowerCase() === viewFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, viewFilter]);

  // Calculate pagination
  const totalResults = filteredGranites.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  
  // Get current page granites
  const currentGranites = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredGranites.slice(startIndex, endIndex);
  }, [filteredGranites, currentPage, pageSize]);

  // Calculate showing range
  const showingFrom = totalResults > 0 ? currentPage * pageSize + 1 : 0;
  const showingTo = Math.min((currentPage + 1) * pageSize, totalResults);

  // Handler for granite card click
  const handleExploreClick = (granite) => {
    setSelectedGranite(granite);
    setShowModal(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGranite(null);
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of gallery when changing page
      window.scrollTo({
        top: document.querySelector('.pd-related-products').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of gallery when changing page
      window.scrollTo({
        top: document.querySelector('.pd-related-products').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of gallery when changing page
    window.scrollTo({
      top: document.querySelector('.pd-related-products').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Generate page numbers for pagination (B2B Style)
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (currentPage <= 2) {
        // Near the start
        for (let i = 0; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        pages.push(0);
        pages.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(0);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }
    
    return pages;
  };

  return (
    <>
      <div className=" container-fluid" id="store-container-granite">
        <Navbar />
        
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-content">
              <h1 className="store-heading">Crafted in Granite. Built to Endure.</h1>
              <p className="store-description">
                From precision-cut granite slabs to expert polishing, we transform natural stone into durable surfaces that enhance kitchens, countertops, and architectural spaces with lasting quality.
              </p>
            </div>
          </div>

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-image">
              {/* Image will be set via background in CSS */}
            </div>
          </div>
        </div>
      </div>

      {/* Second container - search component */}
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
                  placeholder="Search granite by name..."
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
                <option value="all">All Granite</option>
                <option value="white">White Granite</option>
                <option value="black">Black Granite</option>
                <option value="beige">Beige Granite</option>
                <option value="green">Green Granite</option>
                <option value="brown">Brown Granite</option>
                <option value="pink">Pink Granite</option>
                <option value="grey">Grey Granite</option>
                <option value="cream">Cream Granite</option>
                <option value="gold">Gold Granite</option>
                <option value="blue">Blue Granite</option>
                <option value="ivory">Ivory Granite</option>
                <option value="red">Red Granite</option>
                <option value="yellow">Yellow Granite</option>
                <option value="multi">Multi-color Granite</option>
              </select>
              <div className="marble-select-arrow">
                <MdExpandMore />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd container - Granite Gallery */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our Granite Collection</h2>
          <p className="pd-related-subheading">Total: {granites.length} granite types available</p>
        </div>

        <div className="product-cards-container py-4">
          {currentGranites.length === 0 ? (
            <div className="no-results-message">
              <p className="no-results-text">No granites found matching your criteria.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("");
                  setViewFilter("all");
                  setCurrentPage(0);
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="product-cards-row">
                {currentGranites.map((granite) => (
                  <div key={granite.id} className="product-cards-col">
                    <div className="product-card-item">
                      <div className="product-card-image-container">
                        <img
                          src={granite.imgSrc}
                          alt={granite.name}
                          className="product-card-img"
                        />
                      </div>
                      <div className="product-card-content">
                        <h5 className="product-card-heading">{granite.name}</h5>
                        <div className="marble-type-indicator">
                          <span className="marble-type-badge">{granite.type}</span>
                        </div>
                        <button
                          className="product-card-button"
                          onClick={() => handleExploreClick(granite)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* B2B Style Pagination */}
              {totalResults > pageSize && (
                <div className="marble-pagination-container">
                  <div className="marble-pagination-wrapper">
                    {/* Showing Results Info - B2B Style */}
                    <div className="marble-pagination-info">
                      Showing {showingFrom} to {showingTo} of {totalResults} results
                    </div>

                    {/* Pagination Controls - B2B Style */}
                    <div className="marble-pagination-controls">
                      {/* Previous Button */}
                      <button 
                        className="marble-pagination-arrow" 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 0}
                      >
                        <MdKeyboardArrowLeft className="marble-pagination-arrow-icon" />
                      </button>
                      
                      {/* Page Numbers */}
                      <div className="marble-pagination-numbers">
                        {generatePageNumbers().map((pageNum, index) => (
                          pageNum === '...' ? (
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
                      
                      {/* Next Button */}
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
            </>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedGranite && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedGranite.name}</h5>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedGranite.imgSrc} 
                  alt={selectedGranite.name} 
                  className="modal-img"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}