import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaArrowLeft,
  FaTag,
  FaShareAlt,
  FaBookmark,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEye,
  FaChevronRight,
  FaRegBookmark,
  FaPrint,
  FaInstagram,
  FaPinterestP
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import "../../Style/BlogDetail.css";

// Import CEO owner image
import ceoOwnerImage from "../../assets/owner.png";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Always start from the top when visiting/changing article
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (id) {
      fetchBlogDetails();
      fetchRelatedBlogs();
    } else {
      setError("Invalid Blog ID.");
      setLoading(false);
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  // Ensure images inside the article body are lazy-loaded
  useEffect(() => {
    if (!loading) {
      const container = document.querySelector('.article-body');
      if (container) {
        const imgs = container.querySelectorAll('img');
        imgs.forEach((img) => {
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
        });
      }
    }
  }, [loading, blog]);

  const fetchBlogDetails = () => {
    setLoading(true);
    axios
      .get(`https://www.wahatalhijazmarble.com/api/blogs/Blogpost/${id}`)
      .then((response) => {
        setBlog(response.data);
        calculateReadingTime(response.data.body);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog details.");
        setLoading(false);
      });
  };

  const fetchRelatedBlogs = () => {
    axios
      .get(`https://www.wahatalhijazmarble.com/api/blogs/Blogposts`, { params: { limit: 4, page: 1 } })
      .then((response) => {
        if (response.data && Array.isArray(response.data.blogs)) {
          const filtered = response.data.blogs
            .filter(b => b._id !== id)
            .slice(0, 4);
          setRelatedBlogs(filtered);
        }
      })
      .catch((err) => {
        console.error("Error fetching related blogs:", err);
      });
  };

  const calculateReadingTime = (htmlContent) => {
    if (!htmlContent) {
      setReadingTime(2);
      return;
    }
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || "";
    const wordCount = text.trim().split(/\s+/).length;
    const time = Math.ceil(wordCount / 200);
    setReadingTime(time < 1 ? 1 : time);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || "Check out this blog post";

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
      instagram: `https://www.instagram.com/`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add toast notification here if desired
  };

  const generateTOC = (htmlContent) => {
    if (!htmlContent) return [];
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const headings = div.querySelectorAll('h1, h2, h3');
    return Array.from(headings)
      .filter(heading => heading.textContent.trim())
      .map(heading => ({
        id: heading.textContent.toLowerCase().replace(/\s+/g, '-'),
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
      }));
  };

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="skeleton-article">
          <div className="skeleton-title" />
          <div className="skeleton-meta" />
          <div className="skeleton-hero" />
          <div className="skeleton-paragraph" />
          <div className="skeleton-paragraph" />
          <div className="skeleton-paragraph" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-error">
        <div className="error-card">
          <h3>Unable to Load Article</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/blog')} className="back-to-blogs-btn">
            <FaArrowLeft className="back-arrow" />
            Back to All Articles
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-not-found">
        <div className="not-found-card">
          <h3>Article Not Found</h3>
          <p>The article you're looking for doesn't exist or has been moved.</p>
          <button onClick={() => navigate('/blog')} className="back-to-blogs-btn">
            <FaArrowLeft className="back-arrow" />
            Browse All Articles
          </button>
        </div>
      </div>
    );
  }

  const tocItems = generateTOC(blog.body);

  return (
    <div className="blog-detail-page">
      <div className={`blog-navbar ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <button
              className="nav-back-btn"
              onClick={() => navigate('/blog')}
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div className="nav-actions">
              <span className="reading-progress">
                {readingTime} min read
              </span>
              <button 
                className={`nav-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="nav-social-mini">
                <button 
                  className="social-icon-btn twitter"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                >
                  <FaTwitter />
                </button>
                <button 
                  className="social-icon-btn linkedin"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container blog-detail-container">
        <div className="blog-detail-layout">
          <aside className={`blog-sidebar ${isSticky ? 'sticky-sidebar' : ''}`}>
            {tocItems.length > 0 && (
              <div className="sidebar-card toc-card">
                <div className="card-header">
                  <FaChevronRight className="card-icon" />
                  <h3 className="card-title">Contents</h3>
                </div>
                <nav className="toc-nav" aria-label="Table of Contents">
                  {tocItems.map((item, index) => (
                    <a 
                      key={index} 
                      href={`#${item.id}`}
                      className={`toc-item toc-${item.level}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="toc-dot"></span>
                      <span className="toc-text">{item.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="sidebar-card author-card">
              <div className="card-header">
                <FaUserCircle className="card-icon" />
                <h3 className="card-title">About Author</h3>
              </div>
              <div className="author-sidebar">
                <div className="author-sidebar-avatar">
                  <img
                    src={ceoOwnerImage}
                    alt="CEO Owner"
                    className="author-avatar-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<FaUserCircle className="author-avatar-placeholder" />';
                    }}
                  />
                </div>
                <div className="author-sidebar-info">
                  <h4 className="author-name">John Smith</h4>
                  <p className="author-role">CEO & Founder</p>
                  <p className="author-excerpt">
                    With over 15 years of experience in the marble and granite industry,.
                  </p>
                </div>
              </div>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="sidebar-card tags-card">
                <div className="card-header">
                  <FaTag className="card-icon" />
                  <h3 className="card-title">Article Tags</h3>
                </div>
                <div className="tags-cloud">
                  {blog.tags.slice(0, 10).map((tag, index) => (
                    <button 
                      key={index} 
                      className="tag-bubble"
                      onClick={() => navigate(`/blog?tag=${tag}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <main className="blog-main-content">
            <header className="article-header">
              <div className="article-category">
                <BiCategory />
                <span>{blog.category || "Marble & Granite"}</span>
              </div>
              <h1 className="article-title">{blog.title}</h1>
              <div className="article-meta">
                <div className="meta-left">
                  <span className="meta-item author-meta">
                    <img 
                      src={ceoOwnerImage} 
                      alt="CEO Owner"
                      className="meta-author-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<FaUserCircle />';
                      }}
                    />
                    <span>Mr Irfan</span>
                  </span>
                  <span className="meta-item">
                    <FaCalendarAlt />
                    {formatDate(blog.postDate)}
                  </span>
                  <span className="meta-item">
                    <IoMdTime />
                    {readingTime} min read
                  </span>
                  <span className="meta-item">
                    <FaEye />
                    {blog.views || "1.2K"} views
                  </span>
                </div>
                <div className="meta-right">
                  <button 
                    className="meta-action print-btn"
                    onClick={() => window.print()}
                    aria-label="Print article"
                  >
                    <FaPrint />
                    <span>Print</span>
                  </button>
                  <button 
                    className={`meta-action bookmark-btn ${isBookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                  >
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </header>

            {blog.blogImage && (
              <div className="article-hero-image">
                {/* <img
          className="img-fluid rounded shadow mb-4"
          src={blog.blogImage ? `http://localhost:3001/uploads/${blog.blogImage}` : "default-placeholder.jpg"}
          alt={blog.title}
        /> */}
                <img
                  src={`https://www.wahatalhijazmarble.com/uploads/${blog.blogImage}`}
                  alt={blog.title}
                  className="hero-img"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <div className="image-caption">
                    {blog.title}
                  </div>
                </div>
              </div>
            )}

            <article className="article-content">
              <div 
                className="article-body"
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />
            </article>

            <footer className="article-footer">
              {blog.tags && blog.tags.length > 0 && (
                <div className="article-tags">
                  <div className="tags-header">
                    <FaTag />
                    <h4>Topics Covered</h4>
                  </div>
                  <div className="tags-list">
                    {blog.tags.map((tag, index) => (
                      <button 
                        key={index} 
                        className="article-tag"
                        onClick={() => navigate(`/blog?tag=${tag}`)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="share-section">
                <div className="share-intro">
                  <h3>Share This Article</h3>
                  <p>If you found this article helpful, share it with others</p>
                </div>
                <div className="share-buttons">
                  <button 
                    className="share-btn facebook"
                    onClick={() => handleShare('facebook')}
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF />
                    <span>Facebook</span>
                  </button>
                  <button 
                    className="share-btn twitter"
                    onClick={() => handleShare('twitter')}
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter />
                    <span>Twitter</span>
                  </button>
                  <button 
                    className="share-btn linkedin"
                    onClick={() => handleShare('linkedin')}
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn />
                    <span>LinkedIn</span>
                  </button>
                  <button 
                    className="share-btn whatsapp"
                    onClick={() => handleShare('whatsapp')}
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    className="share-btn pinterest"
                    onClick={() => handleShare('pinterest')}
                    aria-label="Share on Pinterest"
                  >
                    <FaPinterestP />
                    <span>Pinterest</span>
                  </button>
                  <button 
                    className="share-btn instagram"
                    onClick={() => handleShare('instagram')}
                    aria-label="Share on Instagram"
                  >
                    <FaInstagram />
                    <span>Instagram</span>
                  </button>
                </div>
              </div>
            </footer>
          </main>

          <aside className="related-sidebar">
            <div className="sidebar-card newsletter-card">
              <div className="newsletter-header">
                <HiOutlineMail className="newsletter-icon" />
                <h3>Stay Updated</h3>
              </div>
              <p className="newsletter-text">
                Get the latest articles on marble care, design trends, and maintenance tips.
              </p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
              <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
            </div>

            {relatedBlogs.length > 0 && (
              <div className="sidebar-card related-card">
                <div className="card-header">
                  <h3 className="card-title">Related Articles</h3>
                </div>
                <div className="related-list">
                  {relatedBlogs.map((relatedBlog) => (
                    <article 
                      key={relatedBlog._id} 
                      className="related-item"
                      onClick={() => navigate(`/BlogDetail/${relatedBlog._id}`)}
                    >
                      <div className="related-item-content">
                        {relatedBlog.category && (
                          <div className="related-item-category">
                            {relatedBlog.category}
                          </div>
                        )}
                        <h4 className="related-item-title">
                          {relatedBlog.title}
                        </h4>
                        <div className="related-item-meta">
                          <span>{formatDate(relatedBlog.postDate)}</span>
                          <span className="meta-separator">•</span>
                          <span>{Math.ceil((relatedBlog.body?.length || 0) / 200)} min read</span>
                        </div>
                      </div>
                      <FaChevronRight className="related-item-arrow" />
                    </article>
                  ))}
                </div>
                <button 
                  className="view-all-btn"
                  onClick={() => navigate('/blog')}
                >
                  View All Articles
                  <FaChevronRight />
                </button>
              </div>
            )}

            <div className="sidebar-card actions-card">
              <div className="card-header">
                <h3 className="card-title">Quick Actions</h3>
              </div>
              <div className="actions-list">
                <button 
                  className={`action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={handleBookmark}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  {isBookmarked ? 'Article Saved' : 'Save Article'}
                </button>
                <button className="action-btn" onClick={() => window.print()}>
                  <FaPrint />
                  Print Article
                </button>
                <button className="action-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <FaArrowLeft />
                  Back to Top
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;