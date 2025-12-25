import "../../Style/Blogpost.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function BlogPost() {
  const [postDate, setPostDate] = useState('');
  const [category, setCategory] = useState('');
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });
  const [blogImage, setBlogImage] = useState(null);
  const navigate = useNavigate();

  // // Check if the user is authenticated on component mount
  // useEffect(() => {
  //   const isAuthenticated = sessionStorage.getItem('userName');
  //   if (!isAuthenticated) {
  //     navigate("/login"); // Redirect to login if not authenticated
  //   }
  // }, [navigate]);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const Submit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!postDate || !category || !username || !occupation || !title || !body) {
      emptyNotification();
      return;
    }

    const formData = new FormData();
    formData.append("postDate", postDate);
    formData.append("category", category);
    formData.append("username", username);
    formData.append("occupation", occupation);
    formData.append("title", title);
    formData.append("body", body);
    if (blogImage) formData.append("blogImage", blogImage);

    axios.post("http://localhost:3001/api/blogs/Blogpost", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(result => {
      console.log(result);
      savenotification();
      // Clear all fields after successful submission
      setPostDate('');
      setCategory('');
      setUsername('');
      setOccupation('');
      setTitle('');
      setBody('');
      if (editor) {
        editor.commands.setContent('');
      }
      setBlogImage(null);
      document.getElementById("blogPostForm").reset(); // Reset file input
    })
    .catch(err => {
      console.log(err);
      errorNotification();
    });
  };

  const errorNotification = () => {
    toast.warn("An error occurred while saving the blog post.", {
      autoClose: 2000,
    });
  };

  const emptyNotification = () => {
    toast.warn("Please fill in all fields.", {
      autoClose: 2000,
    });
  };

  const savenotification = () => {
    toast.success("Blog post saved successfully!", {
      autoClose: 2000,
    });
  };

  return (
    <>
      <ToastContainer />

      <AdminNavbar />
      <div className="container-fluid mt-4">
        <div className="containerblog card p-4">
          <form id="blogPostForm" onSubmit={Submit}>
            <div className="form first">
              <div className="details personal">
                
                <h2 className="text-center mb-4">Create Blog Post</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Post Date</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={postDate}
                      onChange={(e) => setPostDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <input
                      className="form-control"
                      placeholder="Enter Category"
                      list="categories"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  
                    <datalist id="categories">
                      <option value="Activate my SIM" />
                      <option value="Top up" />
                    </datalist>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Occupation</label>
                    <input
                      className="form-control"
                      placeholder="Enter Occupation"
                      list="blogcategories"
                      required
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                <datalist id="blogcategories">
                      <option value="Telecom Network Engineer" />
                      <option value="SIM Card Engineer " />
                      <option value="Electronics Engineer" />
                      <option value="VoLTE & IMS Engineer" />
                      <option value="Embedded Systems Enginee" />

                    </datalist>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Blog Title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Body</label>
                    <div style={{ border: '1px solid #ccc', borderRadius: 4, minHeight: 200, padding: 8 }}>
                      <EditorContent editor={editor} />
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <label className="form-label">Blog Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="col-12 text-end">
                    <button className="btn btn-primary" type="submit">
                      Post Blog
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlogPost;