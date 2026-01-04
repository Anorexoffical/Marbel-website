import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./AdminNavbar";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListOl,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUndo,
  FaRedo,
  FaHeading,
  FaParagraph,
  FaImage,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaBriefcase,
  FaEdit,
  FaPaperPlane
} from 'react-icons/fa';
import "../../Style/Blogpost.css";

function BlogPost() {
  const [postDate, setPostDate] = useState('');
  const [category, setCategory] = useState('');
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      // Preview locally selected file immediately
      setCurrentImageUrl(URL.createObjectURL(file));
      toast.success(`Image selected: ${file.name}`, {
        autoClose: 1500,
      });
    }
  };

  // Keep preview URL in sync whether blogImage is a filename or a File
  useEffect(() => {
    if (!blogImage) {
      setCurrentImageUrl("");
      return;
    }
    if (typeof blogImage === "string") {
      setCurrentImageUrl(`https://www.wahatalhijazmarble.com/uploads/${blogImage}`);
    } else if (blogImage instanceof File) {
      setCurrentImageUrl(URL.createObjectURL(blogImage));
    }
  }, [blogImage]);

  const Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postDate || !category || !username || !occupation || !title || !body) {
      emptyNotification();
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("postDate", postDate);
    formData.append("category", category);
    formData.append("username", username);
    formData.append("occupation", occupation);
    formData.append("title", title);
    formData.append("body", body);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      await axios.post("https://www.wahatalhijazmarble.com/api/blogs/Blogpost", formData, {
        headers: { "Content-Type": "multipart/form-data" }
        // axios.post("http://localhost:3001/api/blogs/Blogpost",
      });
      savenotification();
      resetForm();
    } catch (err) {
      console.log(err);
      errorNotification();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
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
    setCurrentImageUrl("");
    document.getElementById("blogPostForm").reset();
  };

  const errorNotification = () => {
    toast.error("Failed to save blog post. Please try again.", {
      autoClose: 3000,
    });
  };

  const emptyNotification = () => {
    toast.warning("Please fill in all required fields.", {
      autoClose: 3000,
    });
  };

  const savenotification = () => {
    toast.success("Blog post published successfully!", {
      autoClose: 3000,
    });
  };

  if (!editor) {
    return <div className="blog-loading">Loading editor...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <AdminNavbar />
      
      <div className="blog-post-container">
        <div className="blog-post-card">
          {/* Header removed - just the form */}
          <form id="blogPostForm" onSubmit={Submit}>
            <div className="form-grid">
              {/* Image Upload - Full Width */}
              <div className="form-group full-width">
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="blogImage"
                    className="image-upload-input"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="blogImage" className="image-upload-label">
                    <FaImage size={24} />
                    <p>Click to upload featured image</p>
                    <small>PNG, JPG, GIF up to 5MB</small>
                    {currentImageUrl && (
                      <div className="image-preview">
                        <img src={currentImageUrl} alt="Preview" />
                        <span>{typeof blogImage === 'string' ? blogImage : blogImage?.name}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Row 1: Post Date, Category, Username */}
              <div className="form-group">
                <label className="form-label">
                  <FaCalendarAlt className="form-icon" />
                  Post Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="blog-form-control"
                  required
                  value={postDate}
                  onChange={(e) => setPostDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaTag className="form-icon" />
                  Category <span className="required">*</span>
                </label>
                <div className="blog-select-wrapper">
                  <select
                    className="blog-form-control"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Marble">Marble</option>
                    <option value="Granite">Granite</option>
                    <option value="Mosaic">Mosaic</option>
                    <option value="Quartz">Quartz</option>
                    <option value="Travertine">Travertine</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaUser className="form-icon" />
                  Username <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="blog-form-control"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Row 2: Occupation and Blog Title (spanning 2 columns) */}
              <div className="form-group">
                <label className="form-label">
                  <FaBriefcase className="form-icon" />
                  Occupation <span className="required">*</span>
                </label>
                <div className="blog-select-wrapper">
                  <select
                    className="blog-form-control"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  >
                    <option value="">Select occupation</option>
                    <option value="Marble Specialist">Marble Specialist</option>
                    <option value="Granite Specialist">Granite Specialist</option>
                    <option value="Mosaic Designer">Mosaic Designer</option>
                    <option value="Quartz Fabrication Engineer">Quartz Fabrication Engineer</option>
                    <option value="Travertine Specialist">Travertine Specialist</option>
                  </select>
                </div>
              </div>

              {/* Blog Title - spans 2 columns */}
              <div className="form-group blog-title-full">
                <label className="form-label">
                  Blog Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="blog-form-control blog-title-input"
                  placeholder="Enter your blog title here..."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Rich Text Editor - Full Width */}
              <div className="form-group full-width">
                <label className="form-label">
                  Content <span className="required">*</span>
                </label>
                
                {/* Editor Toolbar */}
                <div className="blog-editor-toolbar">
                  <div className="toolbar-row">
                    <div className="toolbar-group">
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
                        title="Heading 1"
                      >
                        H1
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
                        title="Heading 3"
                      >
                        H3
                      </button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
                        title="Bold"
                      >
                        <FaBold />
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
                        title="Italic"
                      >
                        <FaItalic />
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`toolbar-btn ${editor.isActive('underline') ? 'active' : ''}`}
                        title="Underline"
                      >
                        <FaUnderline />
                      </button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                        title="Bullet List"
                      >
                        <FaListUl />
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
                        title="Numbered List"
                      >
                        <FaListOl />
                      </button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
                        title="Align Left"
                      >
                        <FaAlignLeft />
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
                        title="Align Center"
                      >
                        <FaAlignCenter />
                      </button>
                      <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
                        title="Align Right"
                      >
                        <FaAlignRight />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="blog-editor-content">
                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions full-width">
                <button
                  type="button"
                  className="blog-btn-secondary"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="blog-btn-primary"
                  disabled={isSubmitting}
                >
                  <FaPaperPlane className="me-2" />
                  {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlogPost;