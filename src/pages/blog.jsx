import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE, UPLOADS_BASE } from "../config";
import "../Style/Blog.css";
import { FaUserCircle, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExpandMore } from "react-icons/md";
import ceoOwnerImage from "../assets/owner.png";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  // Page size constant
  const PAGE_SIZE = 6;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    fetchBlogs();
    // Ensure hero section is visible on page load
    window.scrollTo(0, 0);
  }, [page, filteredCategory]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (page === 0) {
        fetchBlogs();
      } else {
        setPage(0);
      }
    }, 500);
    
    setSearchTimeout(timeout);
    
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTerm]);

  const fetchBlogs = () => {
    setLoading(true);
    // Use Blogposts route with pagination + search/category params
    const params = {
      page: page + 1,
      limit: PAGE_SIZE,
      search: searchTerm || undefined,
      category: filteredCategory !== "All" ? filteredCategory : undefined,
    };

    axios
      .get(`${API_BASE}/blogs/Blogposts`, { params })
      .then((response) => {
        if (response.data && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
          setTotalPages(response.data.totalPages || 1);
          setTotalResults(response.data.totalBlogs || 0);
        } else {
          throw new Error("Invalid response structure");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);    
        setError("Failed to load blogs.");
        setLoading(false);
      });
  };

  const handleFilter = (category) => {
    setFilteredCategory(category);
    setPage(0);
    // Scroll to top on filter change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setPage(0);
    // Scroll to search section on mobile
    if (isMobile) {
      setTimeout(() => {
        const searchSection = document.querySelector('.blog-b2b-search-filter-container');
        if (searchSection) {
          searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      window.scrollTo({
        top: document.querySelector('.blog-main-container').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({
        top: document.querySelector('.blog-main-container').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({
      top: document.querySelector('.blog-main-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') return text;
    
    const searchLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();
    const startIndex = textLower.indexOf(searchLower);
    
    if (startIndex === -1) return text;
    
    const endIndex = startIndex + searchTerm.length;
    const before = text.substring(0, startIndex);
    const match = text.substring(startIndex, endIndex);
    const after = text.substring(endIndex);
    
    return (
      <>
        {before}
        <span className="search-highlight">{match}</span>
        {after}
      </>
    );
  };

  const truncateHTML = (html, maxLength) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const plainText = div.textContent || div.innerText || "";
    return plainText.length > maxLength
      ? `${plainText.substring(0, maxLength)}...`
      : plainText;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 1) {
        for (let i = 0; i <= (isMobile ? 2 : 3); i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (page >= totalPages - (isMobile ? 2 : 3)) {
        pages.push(0);
        pages.push('...');
        for (let i = totalPages - (isMobile ? 3 : 4); i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push('...');
        const range = isMobile ? 1 : 2;
        for (let i = page - range; i <= page + range; i++) {
          if (i > 0 && i < totalPages - 1) {
            pages.push(i);
          }
        }
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }
    
    return pages;
  };

  const uniqueCategories = React.useMemo(() => {
    if (!Array.isArray(blogs)) return [];
    const categories = [...new Set(blogs.map((blog) => blog.category || "Uncategorized"))];
    return ["All", ...categories];
  }, [blogs]);

  const showingFrom = totalResults > 0 ? page * PAGE_SIZE + 1 : 0;
  const showingTo = Math.min((page + 1) * PAGE_SIZE, totalResults);

  if (loading)
    return (
      <div className="blog-loading-container">
        <div className="blog-spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  if (error) return <p className="blog-error">{error}</p>;

  return (
    <>
      
      <div className="blogpage-wrapper">
        {/* Hero Section - Always visible */}
        <div className="blog-hero-section">
          <div className="blog-hero-overlay">
            <div className="blog-hero-content">
              <h1 className="blog-hero-title">Our Latest Blog Posts</h1>
              <p className="blog-hero-subtitle">
                Discover insights, stories, and expert advice about marble, granite, and luxury stone surfaces
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="blog-main-container">
          {/* Page Title */}
          <div className="blog-page-title-section">
            <h2 className="blog-page-title">Explore Insights & Stories</h2>
            <p className="blog-page-subtitle">
              Stay updated with the latest trends, tips, and inspiration in the world of luxury stone surfaces
            </p>
          </div>

          {/* Search and Filter Container */}
          <div className="blog-b2b-search-filter-container">
            <div className="blog-b2b-search-filter-row">
              {/* Search field */}
              <div className="blog-b2b-search-field-container">
                <form onSubmit={handleSearchSubmit} className="blog-b2b-search-wrapper">
                  <div className="blog-b2b-input-group">
                    <div className="blog-b2b-input-group-icon">
                      <FiSearch className="blog-b2b-search-icon" />
                    </div>
                    <input
                      type="text"
                      className="blog-b2b-form-control blog-b2b-search-input"
                      placeholder={isMobile ? "Search blog posts..." : "Search blog posts by title, content, or category..."}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  {searchTerm && totalResults > 0 && (
                    <div className="blog-b2b-search-results-count">
                      {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"
                    </div>
                  )}

                  {searchTerm && totalResults === 0 && !loading && (
                    <div className="blog-b2b-search-no-results">
                      Your search for "{searchTerm}" produced 0 results
                    </div>
                  )}
                </form>
              </div>

              {/* Filter dropdown */}
              <div className="blog-b2b-filter-dropdown-container">
                <div className="blog-b2b-form-select-wrapper">
                  <select
                    className="blog-b2b-form-select blog-b2b-filter-select"
                    value={filteredCategory}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === "All" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  <div className="blog-b2b-select-arrow">
                    <MdExpandMore />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {blogs.length > 0 ? (
            <div className="blog-posts-grid">
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-card">
                  {/* Blog Image */}
                  <div className="blog-card-image">
                    <img
                      src={
                        blog.blogImage
                          ? `${UPLOADS_BASE}/${blog.blogImage}`
                          : "/default-blog-image.jpg"
                      }
                      alt={blog.title}
                      className="blog-image"
                      loading="lazy"
                    />
                    <div className="blog-category-badge">
                      {blog.category || "Uncategorized"}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span className="blog-date">
                        <FaCalendarAlt className="blog-meta-icon" />
                        {blog.postDate ? formatDate(blog.postDate) : "Recent"}
                      </span>
                    </div>
                    
                    <h3 className="blog-title">
                      {searchTerm 
                        ? highlightSearchTerm(blog.title, searchTerm)
                        : blog.title}
                    </h3>
                    
                    <p className="blog-excerpt">
                      {searchTerm 
                        ? highlightSearchTerm(truncateHTML(blog.body, isMobile ? 100 : 150), searchTerm)
                        : truncateHTML(blog.body, isMobile ? 100 : 150)}
                    </p>

                    <button
                      className="blog-read-more-btn"
                      onClick={() => navigate(`/BlogDetail/${blog._id}`)}
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More <FaArrowRight className="blog-readmore-icon" />
                    </button>

                    {/* Author Info */}
                    <div className="blog-author-info">
                      <div className="blog-author-avatar">
                        <img
                          src={ceoOwnerImage}
                          alt={blog.username || "Admin"}
                          className="author-avatar"
                          loading="lazy"
                        />
                      </div>
                      <div className="blog-author-details">
                        <p className="author-name">{blog.username || "Admin"}</p>
                        <p className="author-role">{blog.occupation || "Marble Expert"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="blog-b2b-no-results">
                <div className="blog-b2b-no-results-content">
                  <h3 className="blog-b2b-no-results-title">No results found</h3>
                  <p className="blog-b2b-no-results-message">
                    {searchTerm
                      ? `Your search for "${searchTerm}" produced 0 results. Try a different search term.`
                      : 'No blog posts found. Try changing your filters.'}
                  </p>
                </div>
              </div>
            )
          )}

          {/* Pagination */}
          {blogs.length > 0 && totalPages > 1 && (
            <div className="blog-b2b-pagination-container">
              <div className="blog-b2b-pagination-wrapper">
                {/* Showing Results Info */}
                <div className="blog-b2b-pagination-info">
                  Showing {showingFrom} to {showingTo} of {totalResults} results
                </div>

                {/* Pagination Controls */}
                <div className="blog-b2b-pagination-controls">
                  {/* Previous Button */}
                  <button 
                    className="blog-b2b-pagination-arrow" 
                    onClick={handlePrevPage} 
                    disabled={page === 0}
                    aria-label="Previous page"
                  >
                    <MdKeyboardArrowLeft className="blog-b2b-pagination-arrow-icon" />
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="blog-b2b-pagination-numbers">
                    {generatePageNumbers().map((pageNum, index) => (
                      pageNum === '...' ? (
                        <span key={`dots-${index}`} className="blog-b2b-pagination-dots">
                          <BsThreeDots />
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          className={`blog-b2b-pagination-number ${page === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageClick(pageNum)}
                          aria-label={`Go to page ${pageNum + 1}`}
                          aria-current={page === pageNum ? "page" : undefined}
                        >
                          {pageNum + 1}
                        </button>
                      )
                    ))}
                  </div>
                  
                  {/* Next Button */}
                  <button 
                    className="blog-b2b-pagination-arrow" 
                    onClick={handleNextPage} 
                    disabled={page >= totalPages - 1}
                    aria-label="Next page"
                  >
                    <MdKeyboardArrowRight className="blog-b2b-pagination-arrow-icon" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsList;