import React, { useState, useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Navbar from "../pages/Navbar";
import "../Style/Marble.css";

// Ceramic Collection Images
import CERAMIC_1 from '../assets/ceramic/image.webp';
import CERAMIC_2 from '../assets/ceramic/image copy.webp';
import CERAMIC_3 from '../assets/ceramic/image copy 2.webp';
import CERAMIC_4 from '../assets/ceramic/image copy 3.webp';
import CERAMIC_5 from '../assets/ceramic/image copy 4.webp';
import CERAMIC_6 from '../assets/ceramic/image copy 5.webp';
import CERAMIC_7 from '../assets/ceramic/image copy 6.webp';
import CERAMIC_8 from '../assets/ceramic/image copy 7.webp';
import CERAMIC_9 from '../assets/ceramic/image copy 8.webp';
import CERAMIC_10 from '../assets/ceramic/image copy 9.webp';
import CERAMIC_11 from '../assets/ceramic/image copy 10.webp';
import CERAMIC_12 from '../assets/ceramic/image copy 11.webp';
import CERAMIC_13 from '../assets/ceramic/image copy 12.webp';
import CERAMIC_14 from '../assets/ceramic/image copy 13.webp';
import CERAMIC_15 from '../assets/ceramic/image copy 14.webp';
import CERAMIC_16 from '../assets/ceramic/image copy 15.webp';
import CERAMIC_17 from '../assets/ceramic/image copy 16.webp';
import CERAMIC_18 from '../assets/ceramic/image copy 17.webp';
import CERAMIC_19 from '../assets/ceramic/image copy 18.webp';
import CERAMIC_20 from '../assets/ceramic/image copy 19.webp';


export default function Ceramic() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState("all");
  
  // Always open from the top when visiting this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  
  // State for modal
  const [selectedCeramic, setSelectedCeramic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9); // 9 cards per page

  // Ceramic data
  const ceramics = [
    { id: 1, name: "Porcelain Classic", imgSrc: CERAMIC_1, type: "Porcelain", finish: "Matte" },
    { id: 2, name: "Glossy White", imgSrc: CERAMIC_2, type: "Ceramic", finish: "Glossy" },
    { id: 3, name: "Wooden Texture", imgSrc: CERAMIC_3, type: "Porcelain", finish: "Textured" },
    { id: 4, name: "Marble Effect", imgSrc: CERAMIC_4, type: "Ceramic", finish: "Polished" },
    { id: 5, name: "Industrial Grey", imgSrc: CERAMIC_5, type: "Porcelain", finish: "Matte" },
    { id: 6, name: "Geometric Pattern", imgSrc: CERAMIC_6, type: "Ceramic", finish: "Glossy" },
    { id: 7, name: "Stone Look", imgSrc: CERAMIC_7, type: "Porcelain", finish: "Textured" },
    { id: 8, name: "Minimalist White", imgSrc: CERAMIC_8, type: "Ceramic", finish: "Matte" },
    { id: 9, name: "Hexagonal Blue", imgSrc: CERAMIC_9, type: "Ceramic", finish: "Glossy" },
    { id: 10, name: "Terracotta Style", imgSrc: CERAMIC_10, type: "Terracotta", finish: "Natural" },
    { id: 11, name: "Metallic Finish", imgSrc: CERAMIC_11, type: "Porcelain", finish: "Metallic" },
    { id: 12, name: "Subway Tile", imgSrc: CERAMIC_12, type: "Ceramic", finish: "Glossy" },
    { id: 13, name: "Mosaic Pattern", imgSrc: CERAMIC_13, type: "Ceramic", finish: "Polished" },
    { id: 14, name: "Mosaic Pattern", imgSrc: CERAMIC_14, type: "Ceramic", finish: "Polished" },
    { id: 15, name: "Mosaic Pattern", imgSrc: CERAMIC_15, type: "Ceramic", finish: "Polished" },
    { id: 16, name: "Mosaic Pattern", imgSrc: CERAMIC_16, type: "Ceramic", finish: "Polished" },
    { id: 17, name: "Mosaic Pattern", imgSrc: CERAMIC_17, type: "Ceramic", finish: "Polished" },
    { id: 18, name: "Mosaic Pattern", imgSrc: CERAMIC_18, type: "Ceramic", finish: "Polished" },
    { id: 19, name: "Mosaic Pattern", imgSrc: CERAMIC_19, type: "Ceramic", finish: "Polished" },
    { id: 20, name: "Mosaic Pattern", imgSrc: CERAMIC_20, type: "Ceramic", finish: "Polished" },
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

  // Filter ceramics based on search term and filter
  const filteredCeramics = useMemo(() => {
    return ceramics.filter(ceramic => {
      const matchesSearch = ceramic.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = viewFilter === "all" || 
                          ceramic.type.toLowerCase() === viewFilter.toLowerCase() ||
                          ceramic.finish.toLowerCase() === viewFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, viewFilter]);

  // Calculate pagination
  const totalResults = filteredCeramics.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  
  // Get current page ceramics
  const currentCeramics = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCeramics.slice(startIndex, endIndex);
  }, [filteredCeramics, currentPage, pageSize]);

  // Calculate showing range
  const showingFrom = totalResults > 0 ? currentPage * pageSize + 1 : 0;
  const showingTo = Math.min((currentPage + 1) * pageSize, totalResults);

  // Handler for ceramic card click
  const handleExploreClick = (ceramic) => {
    setSelectedCeramic(ceramic);
    setShowModal(true);
  };

  // Handler for modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCeramic(null);
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
      <div className=" container-fluid" id="store-container-ceramic">
        <Navbar />
        
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-content">
              <h1 className="store-heading">Elegant Ceramics. Timeless Beauty.</h1>
              <p className="store-description">
                Discover our premium collection of ceramic tiles, blending modern design with traditional craftsmanship. Perfect for floors, walls, and creative spaces.
              </p>
            </div>
          </div>

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="store-image ceramic-bg">
              {/* Background image set via CSS */}
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
                  placeholder="Search ceramic by name..."
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
                <option value="all">All Ceramics</option>
                <option value="porcelain">Porcelain</option>
                <option value="ceramic">Ceramic Tiles</option>
                <option value="terracotta">Terracotta</option>
                <option value="glossy">Glossy Finish</option>
                <option value="matte">Matte Finish</option>
                <option value="polished">Polished Finish</option>
                <option value="textured">Textured Finish</option>
                <option value="metallic">Metallic Finish</option>
              </select>
              <div className="marble-select-arrow">
                <MdExpandMore />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd container - Ceramic Gallery */}
      <div className="pd-related-products">
        <div className="pd-related-heading-container mb-4">
          <h2 className="pd-related-heading">Our Ceramic Collection</h2>
        </div>

        <div className="product-cards-container py-4">
          {currentCeramics.length === 0 ? (
            <div className="no-results-message">
              <p className="no-results-text">No ceramics found matching your criteria.</p>
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
                {currentCeramics.map((ceramic) => (
                  <div key={ceramic.id} className="product-cards-col">
                    <div className="product-card-item">
                      <div className="product-card-image-container">
                        <img
                          src={ceramic.imgSrc}
                          alt={ceramic.name}
                          className="product-card-img"
                        />
                      </div>
                      <div className="product-card-content">
                        <h5 className="product-card-heading">{ceramic.name}</h5>
                        <div className="ceramic-type-indicator">
                          <span className="ceramic-type-badge">{ceramic.type}</span>
                          <span className="ceramic-finish-badge ms-2">{ceramic.finish}</span>
                        </div>
                        <button
                          className="product-card-button"
                          onClick={() => handleExploreClick(ceramic)}
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
      {showModal && selectedCeramic && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedCeramic.name}</h5>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedCeramic.imgSrc} 
                  alt={selectedCeramic.name} 
                  className="modal-img"
                />
              </div>
              <div className="modal-details mt-3">
                <p><strong>Type:</strong> {selectedCeramic.type}</p>
                <p><strong>Finish:</strong> {selectedCeramic.finish}</p>
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