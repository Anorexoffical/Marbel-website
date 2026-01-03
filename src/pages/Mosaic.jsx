import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Navbar from "../pages/Navbar";
import "../Style/Marble.css";

// Mosaic Collection Images (reverted to original casing as requested)
import MOSAIC_1 from '../assets/Mosaic/image11.png';
import MOSAIC_2 from '../assets/Mosaic/image22.png';
import MOSAIC_3 from '../assets/Mosaic/image33.png';
import MOSAIC_4 from '../assets/Mosaic/image44.png';
import MOSAIC_5 from '../assets/Mosaic/image55.png';
import MOSAIC_6 from '../assets/Mosaic/image66.png';
import MOSAIC_7 from '../assets/Mosaic/image77.png';
import MOSAIC_8 from '../assets/Mosaic/image88.png';
import MOSAIC_9 from '../assets/Mosaic/image99.png';

export default function Mosaic() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("all");
  
  // State for modal
  const [selectedMosaic, setSelectedMosaic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9); // 9 cards per page

  // Mosaic data
  const mosaics = [
    { id: 1, name: "CLASSIC PATTERN MOSAIC", imgSrc: MOSAIC_1, type: "Classic" },
    { id: 2, name: "MODERN GEOMETRIC MOSAIC", imgSrc: MOSAIC_2, type: "Modern" },
    { id: 3, name: "TRADITIONAL FLORAL MOSAIC", imgSrc: MOSAIC_3, type: "Traditional" },
    { id: 4, name: "CONTEMPORARY ART MOSAIC", imgSrc: MOSAIC_4, type: "Contemporary" },
    { id: 5, name: "VINTAGE STONE MOSAIC", imgSrc: MOSAIC_5, type: "Vintage" },
    { id: 6, name: "LUXURY GOLD MOSAIC", imgSrc: MOSAIC_6, type: "Luxury" },
    { id: 7, name: "MINIMALIST MOSAIC", imgSrc: MOSAIC_7, type: "Minimalist" },
    { id: 8, name: "BYZANTINE PATTERN MOSAIC", imgSrc: MOSAIC_8, type: "Byzantine" },
    { id: 9, name: "NATURAL STONE MOSAIC", imgSrc: MOSAIC_9, type: "Natural" },
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

  // Filter mosaics based on search term and filter
  const filteredMosaics = useMemo(() => {
    return mosaics.filter(mosaic => {
      const matchesSearch = mosaic.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = viewFilter === "all" || mosaic.type.toLowerCase() === viewFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, viewFilter]);

  // Calculate pagination
  const totalResults = filteredMosaics.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  
  // Get current page mosaics
  const currentMosaics = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredMosaics.slice(startIndex, endIndex);
  }, [filteredMosaics, currentPage, pageSize]);

  // Calculate showing range
  const showingFrom = totalResults > 0 ? currentPage * pageSize + 1 : 0;
  const showingTo = Math.min((currentPage + 1) * pageSize, totalResults);

  // Handler for mosaic card click
  const handleExploreClick = (mosaic) => {
    setSelectedMosaic(mosaic);
    setShowModal(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMosaic(null);
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
      <div className=" container-fluid" id="store-container">
        <Navbar />
        
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-content">
              <h1 className="store-heading">Artistic Mosaic. Timeless Patterns.</h1>
              <p className="store-description">
                From intricate tile arrangements to expert craftsmanship, we create stunning mosaic patterns that transform walls, floors, and surfaces into works of art for residential and commercial spaces.
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
                  placeholder="Search mosaic by name..."
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
                <option value="all">All Mosaics</option>
                <option value="classic">Classic Mosaics</option>
                <option value="modern">Modern Mosaics</option>
                <option value="traditional">Traditional Mosaics</option>
                <option value="contemporary">Contemporary Mosaics</option>
                <option value="vintage">Vintage Mosaics</option>
                <option value="luxury">Luxury Mosaics</option>
                <option value="minimalist">Minimalist Mosaics</option>
                <option value="byzantine">Byzantine Mosaics</option>
                <option value="natural">Natural Mosaics</option>
                <option value="glass">Glass Mosaics</option>
              </select>
              <div className="marble-select-arrow">
                <MdExpandMore />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd container - Mosaic Gallery */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our Mosaic Collection</h2>
        </div>

        <div className="product-cards-container py-4">
          {currentMosaics.length === 0 ? (
            <div className="no-results-message">
              <p className="no-results-text">No mosaics found matching your criteria.</p>
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
                {currentMosaics.map((mosaic) => (
                  <div key={mosaic.id} className="product-cards-col">
                    <div className="product-card-item">
                      <div className="product-card-image-container">
                        <img
                          src={mosaic.imgSrc}
                          alt={mosaic.name}
                          className="product-card-img"
                        />
                      </div>
                      <div className="product-card-content">
                        <h5 className="product-card-heading">{mosaic.name}</h5>
                        <div className="marble-type-indicator">
                          <span className="marble-type-badge">{mosaic.type}</span>
                        </div>
                        <button
                          className="product-card-button"
                          onClick={() => handleExploreClick(mosaic)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* B2B Style Pagination - Only show if more than 9 items */}
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
      {showModal && selectedMosaic && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedMosaic.name}</h5>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedMosaic.imgSrc} 
                  alt={selectedMosaic.name} 
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