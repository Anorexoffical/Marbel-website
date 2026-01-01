import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Navbar from "../pages/Navbar";
import "../Style/Marble.css";

// Travertine Collection Images (PNG format)
import NOCHE_TRAVERTINE from '../assets/travertine/NOCHE TRAVERTINE.png';
import RED_TRAVERTINE from '../assets/travertine/RED-TRAVERTINE.png';
import ROMAN_NAVONA_TRAVERTINE_UNFILLED from '../assets/travertine/ROMAN NAVONA TRAVERTINE UNFILLED.png';
import ROMAN_TRAVERTINE_UNFILLED_HONED from '../assets/travertine/ROMAN TRAVERTINE UNFILLED HONED.png';
import SILVER_TRAVERTINE from '../assets/travertine/SILVER TRAVERTINE.png';
import TRAVERTINE_BEIGE_ITALY from '../assets/travertine/TRAVERTINE BEIGE ITALY.png';
import TRAVERTINE_BEIGE_TURKEY from '../assets/travertine/TRAVERTINE BEIGE TURKEY.png';
import TRAVERTINE_BEIGE_UNFILLED_POLISHED from '../assets/travertine/TRAVERTINE BEIGE UNFILLED & POLISHED.png';
import TRAVERTINE_CROSS_CUT from '../assets/travertine/TRAVERTINE CROSS CUT.png';
import TRAVERTINE_SILVER_ROMANO from '../assets/travertine/TRAVERTINE SILVER ROMANO.png';
import TRAVERTINE_UNFILLED from '../assets/travertine/TRAVERTINE UNFILLED.png';
import YELLOW_TRAVERTINE from '../assets/travertine/YELLOW TRAVERTINE.png';

export default function Travertine() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("all");
  
  // State for modal
  const [selectedTravertine, setSelectedTravertine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9); // 9 cards per page

  // Travertine data
  const travertines = [
    { id: 1, name: "NOCHE TRAVERTINE", imgSrc: NOCHE_TRAVERTINE, type: "Brown" },
    { id: 2, name: "RED TRAVERTINE", imgSrc: RED_TRAVERTINE, type: "Red" },
    { id: 3, name: "ROMAN NAVONA TRAVERTINE UNFILLED", imgSrc: ROMAN_NAVONA_TRAVERTINE_UNFILLED, type: "Beige" },
    { id: 4, name: "ROMAN TRAVERTINE UNFILLED HONED", imgSrc: ROMAN_TRAVERTINE_UNFILLED_HONED, type: "Beige" },
    { id: 5, name: "SILVER TRAVERTINE", imgSrc: SILVER_TRAVERTINE, type: "Grey" },
    { id: 6, name: "TRAVERTINE BEIGE ITALY", imgSrc: TRAVERTINE_BEIGE_ITALY, type: "Beige" },
    { id: 7, name: "TRAVERTINE BEIGE TURKEY", imgSrc: TRAVERTINE_BEIGE_TURKEY, type: "Beige" },
    { id: 8, name: "TRAVERTINE BEIGE UNFILLED & POLISHED", imgSrc: TRAVERTINE_BEIGE_UNFILLED_POLISHED, type: "Beige" },
    { id: 9, name: "TRAVERTINE CROSS CUT", imgSrc: TRAVERTINE_CROSS_CUT, type: "Beige" },
    { id: 10, name: "TRAVERTINE SILVER ROMANO", imgSrc: TRAVERTINE_SILVER_ROMANO, type: "Grey" },
    { id: 11, name: "TRAVERTINE UNFILLED", imgSrc: TRAVERTINE_UNFILLED, type: "Beige" },
    { id: 12, name: "YELLOW TRAVERTINE", imgSrc: YELLOW_TRAVERTINE, type: "Yellow" },
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

  // Filter travertines based on search term and filter
  const filteredTravertines = useMemo(() => {
    return travertines.filter(travertine => {
      const matchesSearch = travertine.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = viewFilter === "all" || travertine.type.toLowerCase() === viewFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, viewFilter]);

  // Calculate pagination
  const totalResults = filteredTravertines.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  
  // Get current page travertines
  const currentTravertines = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTravertines.slice(startIndex, endIndex);
  }, [filteredTravertines, currentPage, pageSize]);

  // Calculate showing range
  const showingFrom = totalResults > 0 ? currentPage * pageSize + 1 : 0;
  const showingTo = Math.min((currentPage + 1) * pageSize, totalResults);

  // Handler for travertine card click
  const handleExploreClick = (travertine) => {
    setSelectedTravertine(travertine);
    setShowModal(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTravertine(null);
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
      <div className=" container-fluid" id="store-container-travertine">
        <Navbar />
        
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-content">
              <h1 className="store-heading">Crafted in Travertine. Timeless Elegance.</h1>
              <p className="store-description">
                From natural travertine stone to expert finishing, we transform porous limestone into beautiful surfaces that add warmth and character to floors, walls, and architectural features.
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
                  placeholder="Search travertine by name..."
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
                <option value="all">All Travertine</option>
                <option value="beige">Beige Travertine</option>
                <option value="brown">Brown Travertine</option>
                <option value="grey">Grey Travertine</option>
                <option value="red">Red Travertine</option>
                <option value="yellow">Yellow Travertine</option>
              </select>
              <div className="marble-select-arrow">
                <MdExpandMore />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd container - Travertine Gallery */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our Travertine Collection</h2>
        </div>

        <div className="product-cards-container py-4">
          {currentTravertines.length === 0 ? (
            <div className="no-results-message">
              <p className="no-results-text">No travertines found matching your criteria.</p>
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
                {currentTravertines.map((travertine) => (
                  <div key={travertine.id} className="product-cards-col">
                    <div className="product-card-item">
                      <div className="product-card-image-container">
                        <img
                          src={travertine.imgSrc}
                          alt={travertine.name}
                          className="product-card-img"
                        />
                      </div>
                      <div className="product-card-content">
                        <h5 className="product-card-heading">{travertine.name}</h5>
                        <div className="marble-type-indicator">
                          <span className="marble-type-badge">{travertine.type}</span>
                        </div>
                        <button
                          className="product-card-button"
                          onClick={() => handleExploreClick(travertine)}
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
      {showModal && selectedTravertine && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedTravertine.name}</h5>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedTravertine.imgSrc} 
                  alt={selectedTravertine.name} 
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