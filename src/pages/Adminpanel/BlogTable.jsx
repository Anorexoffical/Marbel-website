import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/BlogTable.css";
import AdminNavbar from "../Adminpanel/AdminNavbar.jsx";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortField, setSortField] = useState("postDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://www.wahatalhijazmarble.com/api/blogs/AllBlogs");
      setBlogs(response.data);
      setFilteredBlogs(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(blog => blog.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      toast.error("Failed to load blogs. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...blogs];

    // Apply search
    if (searchTerm) {
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === "postDate") {
        return sortDirection === "asc"
          ? new Date(a.postDate) - new Date(b.postDate)
          : new Date(b.postDate) - new Date(a.postDate);
      } else if (sortField === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [blogs, searchTerm, selectedCategory, sortField, sortDirection]);

  const onDelete = async () => {
    if (blogToDelete) {
      try {
        await axios.delete(`https://www.wahatalhijazmarble.com/api/blogs/Blogpost/${blogToDelete._id}`);
        toast.success("Blog deleted successfully!");
        fetchAllBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog. Please try again.");
      } finally {
        setShowDeleteModal(false);
        setBlogToDelete(null);
      }
    }
  };

  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const onEdit = (blogId) => {
    navigate(`/EditBlogPost/${blogId}`);
  };

  const onView = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const onAddNew = () => {
    navigate("/BlogPost");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    const cleanText = text.replace(/<[^>]*>/g, '');
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substr(0, maxLength) + '...';
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <AdminNavbar />
      <div className="b2b-blog-container">
        {/* Header Section */}
        <div className="b2b-blog-header">
          <div>
            <h1 className="b2b-blog-title">
              Blog Management
            </h1>
            <p className="b2b-blog-subtitle">
              {filteredBlogs.length} posts found
            </p>
          </div>
          <button 
            className="b2b-btn-primary"
            onClick={onAddNew}
          >
            <FaPlus className="me-2" />
            Add New Blog
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="b2b-controls-container">
          {/* Search on left */}
          <div className="b2b-search-wrapper">
            <div className="b2b-search-box">
              <FaSearch className="b2b-search-icon" />
              <input
                type="text"
                className="b2b-search-input"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <div className="b2b-search-result">
                {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchTerm}"
              </div>
            )}
          </div>

          {/* Filter on right */}
          <div className="b2b-filter-wrapper">
            <div className="b2b-filter-group">
              <select
                className="b2b-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="b2b-table-wrapper">
          {loading ? (
            <div className="b2b-loading">
              <div className="b2b-spinner"></div>
              <p>Loading blogs...</p>
            </div>
          ) : (
            <>
              <div className="b2b-table-responsive">
                <table className="b2b-blog-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th 
                        className="b2b-sortable"
                        onClick={() => handleSort("title")}
                      >
                        <div className="b2b-sort-header">
                          Title {getSortIcon("title")}
                        </div>
                      </th>
                      <th>Author</th>
                      <th>Category</th>
                      <th 
                        className="b2b-sortable"
                        onClick={() => handleSort("postDate")}
                      >
                        <div className="b2b-sort-header">
                          Date {getSortIcon("postDate")}
                        </div>
                      </th>
                      <th className="b2b-actions-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBlogs.length > 0 ? (
                      currentBlogs.map((blog, index) => (
                        <tr key={blog._id} className="b2b-table-row">
                          <td className="b2b-serial">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td>
                            <div className="b2b-blog-title-cell">
                              <div className="b2b-blog-title">
                                {blog.title}
                              </div>
                              <div className="b2b-blog-excerpt">
                                {truncateText(blog.body)}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="b2b-author-cell">
                              <FaUser className="b2b-author-icon" />
                              <span>{blog.username}</span>
                            </div>
                            {blog.occupation && (
                              <div className="b2b-occupation">
                                {blog.occupation}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="b2b-category">
                              {blog.category}
                            </span>
                          </td>
                          <td>
                            <div className="b2b-date-cell">
                              <FaCalendarAlt className="b2b-date-icon" />
                              <span>{formatDate(blog.postDate)}</span>
                            </div>
                          </td>
                          <td>
                            <div className="b2b-action-buttons">
                              <button
                                className="b2b-btn-action b2b-btn-view"
                                onClick={() => onView(blog._id)}
                                title="View"
                              >
                                <FaEye />
                              </button>
                              <button
                                className="b2b-btn-action b2b-btn-edit"
                                onClick={() => onEdit(blog._id)}
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="b2b-btn-action b2b-btn-delete"
                                onClick={() => confirmDelete(blog)}
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="b2b-no-data">
                          <div className="b2b-no-data-content">
                            <div className="b2b-no-data-icon">📝</div>
                            <p className="b2b-no-data-text">
                              {searchTerm
                                ? `Your search for "${searchTerm}" produced 0 results. Try a different search term.`
                                : 'No blog posts found.'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredBlogs.length > itemsPerPage && (
                <div className="b2b-pagination">
                  <div className="b2b-pagination-info">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBlogs.length)} of {filteredBlogs.length}
                  </div>
                  
                  <div className="b2b-pagination-controls">
                    <button
                      className="b2b-pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="b2b-page-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            className={`b2b-page-btn ${currentPage === pageNum ? 'b2b-active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      className="b2b-pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="b2b-modal-overlay">
          <div className="b2b-modal-content">
            <div className="b2b-modal-body">
              <p className="b2b-modal-title">Confirm Delete</p>
              <p className="b2b-modal-text">Are you sure you want to delete this blog post?</p>
              <p className="b2b-modal-blog-title">"{blogToDelete.title}"</p>
              <p className="b2b-modal-subtext">This action cannot be undone.</p>
              <div className="b2b-modal-actions">
                <button
                  className="b2b-btn-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBlogToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="b2b-btn-danger"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogTable;