const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const BlogPostModel = require("../models/BlogPostModel");
const fs = require("fs");

// Upload folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// ----------------------------
// POST: Create blog
// ----------------------------
router.post("/blogs", upload.single("blogImage"), async (req, res) => {
  try {
    const newBlog = await BlogPostModel.create({
      postDate: req.body.postDate || new Date().toISOString().split("T")[0],
      category: req.body.category || "General",
      username: req.body.username || "admin",
      occupation: req.body.occupation || "Admin",
      title: req.body.title,
      body: req.body.body,
      blogImage: req.file?.filename || null,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating blog", details: err });
  }
});

// ----------------------------
// GET: List blogs
// ----------------------------
router.get("/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const blogs = await BlogPostModel.find()
      .sort({ postDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalBlogs = await BlogPostModel.countDocuments();
    res.status(200).json({ blogs, page, totalPages: Math.ceil(totalBlogs / limit), totalBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

// ----------------------------
// GET: All blogs without pagination
// ----------------------------
router.get("/blogs/all", async (req, res) => {
  try {
    const blogs = await BlogPostModel.find().sort({ postDate: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching all blogs" });
  }
});

// ----------------------------
// GET, PUT, DELETE by ID
// ----------------------------
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await BlogPostModel.findById(req.params.id);
    res.status(blog ? 200 : 404).json(blog || { message: "Blog not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching blog" });
  }
});

router.put("/blogs/:id", upload.single("blogImage"), async (req, res) => {
  try {
    const updatedBlog = await BlogPostModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, blogImage: req.file?.filename },
      { new: true }
    );
    res.status(updatedBlog ? 200 : 404).json(updatedBlog || { message: "Blog not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating blog" });
  }
});

router.delete("/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await BlogPostModel.findByIdAndDelete(req.params.id);
    res.status(deletedBlog ? 200 : 404).json({ message: deletedBlog ? "Blog deleted" : "Blog not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting blog" });
  }
});

module.exports = router;
