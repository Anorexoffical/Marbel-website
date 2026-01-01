import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Navbar from "../pages/Navbar";
import "../Style/Marble.css";

// Granite Collection Images - First batch (existing)
import ALASKA_GOLD from '../assets/granite/ALASKA GOLD.png';
import ALASKA_WHITE from '../assets/granite/ALASKA WHITE.png';
import ANTIQUE_BROWN from '../assets/granite/ANTIQUE-BROWN.png';
import ARABSCATO1 from '../assets/granite/ARABSCATO1.png';
import MAGMA_BLACK from '../assets/granite/MAGMA BLACK.png';
import MING_GREEN from '../assets/granite/MING-GREEN.png';
import ORO_BRAZIL from '../assets/granite/ORO BRAZIL.png';
import PATAGONIA from '../assets/granite/PATAGONIA.png';
import PLATINUM_WHITE from '../assets/granite/PLATINUM WHITE.png';
import SHIVAKASI_GOLD from '../assets/granite/SHIVAKASI GOLD.png';
import SODA_LIGHT from '../assets/granite/SODA LIGHT.png';
import STEEL_GREY_POLISHED from '../assets/granite/STEEL-GREY-POLISHED.png';
import VISCOUNT_WHITE from '../assets/granite/VISCOUNT-WHITE.png';


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

  // Granite data - corrected to match available imports
  const granites = [
    // First batch (granite folder)
    { id: 1, name: "ALASKA GOLD", imgSrc: ALASKA_GOLD, type: "Gold" },
    { id: 2, name: "ALASKA WHITE", imgSrc: ALASKA_WHITE, type: "White" },
    { id: 3, name: "ANTIQUE BROWN", imgSrc: ANTIQUE_BROWN, type: "Brown" },
    { id: 4, name: "ARABSCATO", imgSrc: ARABSCATO1, type: "White" },
    { id: 5, name: "MAGMA BLACK", imgSrc: MAGMA_BLACK, type: "Black" },
    { id: 6, name: "MING GREEN", imgSrc: MING_GREEN, type: "Green" },
    { id: 7, name: "ORO BRAZIL", imgSrc: ORO_BRAZIL, type: "Gold" },
    { id: 8, name: "PATAGONIA", imgSrc: PATAGONIA, type: "Multi" },
    { id: 9, name: "PLATINUM WHITE", imgSrc: PLATINUM_WHITE, type: "White" },
    { id: 10, name: "SHIVAKASI GOLD", imgSrc: SHIVAKASI_GOLD, type: "Gold" },
    { id: 11, name: "SODA LIGHT", imgSrc: SODA_LIGHT, type: "Grey" },
    { id: 12, name: "STEEL GREY POLISHED", imgSrc: STEEL_GREY_POLISHED, type: "Grey" },
    { id: 13, name: "VISCOUNT WHITE", imgSrc: VISCOUNT_WHITE, type: "White" },

    // Second batch (granite/second folder)
    { id: 14, name: "AZUL BAHIA", imgSrc: AZULBAHIA, type: "Blue" },
    { id: 15, name: "AZUL MACUBA", imgSrc: AZUL_MACUBA, type: "Blue" },
    { id: 16, name: "BIANCO SARDO", imgSrc: BIANCOSARDO, type: "White" },
    { id: 17, name: "BLACK ABSOLUTE", imgSrc: BLACK_ABSOLUTE, type: "Black" },
    { id: 18, name: "BLACK GALAXY", imgSrc: BLACK_GALAXY, type: "Black" },
    { id: 19, name: "BLUE PEARL GT", imgSrc: BLUE_PEARL_GT, type: "Blue" },
    { id: 20, name: "CRYSTAL YELLOW", imgSrc: CRYSTAL_YELLOW, type: "Yellow" },
    { id: 21, name: "EMERALD PEARL", imgSrc: EMERALD_PEARL, type: "Green" },
    { id: 22, name: "FAREAST WHITE", imgSrc: FAREAST_WHITE, type: "White" },
    { id: 23, name: "INDIAN JUPRANA", imgSrc: INDIAN_JUPRANA, type: "Multi" },
    { id: 24, name: "LABRADOR ANTIQUE", imgSrc: LABRADOR_ANTIQUE, type: "Blue" },
    { id: 25, name: "LEMURIAN BLUE", imgSrc: LEMURIAN_BLUE, type: "Blue" },
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