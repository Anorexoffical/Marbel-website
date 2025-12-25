import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../pages/Navbar.jsx";
import "../style/Blog.css";
import { FaUserCircle } from "react-icons/fa";
// import Footer from "../Footer.jsx";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/blogs/Blogposts?page=${page}&limit=4`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging API Response
        if (response.data && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
          setTotalPages(response.data.totalPages || 1);
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
  }, [page]);

  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const filteredBlogs = Array.isArray(blogs)
    ? filteredCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === filteredCategory)
    : [];

  const truncateHTML = (html, maxLength) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const plainText = div.textContent || div.innerText || "";
    return plainText.length > maxLength
      ? `${plainText.substring(0, maxLength)}...`
      : plainText;
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="mainblogheading">
        <h1 style={{ paddingTop: "1px" }}></h1>
        <Navbar />
        <h1 className="blogheading">Our Latest Blog Posts</h1>
      </div>
      <div className="py-5 bg-light">
        <h1 className="text-center supportheading">Explore Insights & Stories</h1>
        <div className="text-center my-4">
          <button className="btn btnoutline mx-2" onClick={() => handleFilter("All")}>
            All
          </button>
          {[...new Set(blogs.map((blog) => blog.category || "Uncategorized"))].map(
            (category) => (
              <button
                key={category}
                className="btn btnoutline mx-2"
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
        <div className="container mt-9" style={{ marginTop: "100px" }}>
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className="row mb-5">
              <div className="col-md-4">
                <img
                  className="img-fluid rounded"
                  src={
                    blog.blogImage
                      ? `http://localhost:3001/uploads/${blog.blogImage}`
                      : "default-placeholder.jpg"
                  }
                  alt={blog.title}
                />
              </div>
              <div className="col-md-8 d-flex flex-column justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    {blog.postDate} |{" "}
                    <span className="badge bgcolor ms-2">
                      {blog.category || "Uncategorized"}
                    </span>
                  </p>
                  <h2 className="h4 mb-3">{blog.title}</h2>
                  <p className="text-secondary">{truncateHTML(blog.body, 200)}</p>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => navigate(`/BlogDetail/${blog._id}`)}
                  >
                    Read More
                  </button>
                </div>
                <hr className="my-3" />
                <div className="d-flex align-items-center">
                  {blog.userImage ? (
                    <img
                      src={blog.userImage}
                      alt={blog.username}
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  ) : (
                    <FaUserCircle style={{ width: 40, height: 40 }} />
                  )}
                  <div className="ms-2">
                    <p className="mb-0 fw-bold">{blog.username}</p>
                    <p className="mb-0 text-muted">{blog.occupation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <button className="pagination-btn" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span className="pagination-text">
            Page {page} of {totalPages}
          </span>
          <button className="pagination-btn" onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogsList;
