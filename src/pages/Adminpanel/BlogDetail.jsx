import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const BlogDetail = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const [blog, setBlog] = useState(null); // State for blog data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Blog ID:", id); // Log the ID to make sure it's valid

    if (id) {
      axios
        .get(`http://localhost:3001/api/blogs/Blogpost/${id}`)
        .then((response) => {
          console.log("Blog data:", response.data); // Log the full response data
          setBlog(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Error fetching blog details:",
            err.response ? err.response.data : err.message
          );
          setError("Failed to load blog details.");
          setLoading(false);
        });
    } else {
      setError("Invalid Blog ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (error) return <p className="text-center text-danger mt-10">{error}</p>;

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Back Button */}
        <button
          className="btn btn-link text-primary mb-4"
          onClick={() => navigate(-1)}
        >
          &larr; Back to Blogs
        </button>

        {/* Blog Image */}
        <img
          className="img-fluid rounded shadow mb-4"
          src={blog.blogImage ? `http://localhost:3001/uploads/${blog.blogImage}` : "default-placeholder.jpg"}
          alt={blog.title}
        />

        {/* Blog Title */}
        <h1 className="display-4 text-dark mb-3">{blog.title}</h1>

        {/* Blog Author and Date */}
        <div className="d-flex align-items-center text-muted mb-4">
          <FaUserCircle style={{ width: 40, height: 40 }} />
          <div className="ms-3">
            <p className="mb-1 fw-bold text-dark">{blog.username}</p>
            <p className="mb-0">{blog.postDate}</p>
          </div>
        </div>

        {/* Blog Body */}
        <div
          className="text-dark"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetail;
