import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../../Style/BlogPost.css";

function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/blogs/AllBlogs");
      setBlogs(response.data); // Set all blogs
    } catch (error) {
      console.error("Error fetching all blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs(); // Use this to fetch all blogs on component mount
  }, []);

  const onDelete = async (blog) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3001/api/blogs/Blogpost/${blog._id}`);
        fetchAllBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const onEdit = (blogId) => {
    navigate(`/EditBlogPost/${blogId}`);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Title</th>
                <th scope="col">Username</th>
                <th scope="col">Date</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.username}</td>
                  <td>{blog.postDate}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm editbtn mx-1"
                      onClick={() => onEdit(blog._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn deletebtn btn-sm mx-1"
                      onClick={() => onDelete(blog)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BlogTable;
