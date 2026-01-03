const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const BlogPostModel = require("../models/BlogPostModel");

// Upload folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* =============================
   POST – Create blog
============================= */
// Accept both 'image' and 'blogImage' keys for compatibility
router.post(["/", "/Blogpost"], upload.fields([
  { name: "image", maxCount: 1 },
  { name: "blogImage", maxCount: 1 }
]), async (req, res) => {
  try {
    const file = (req.files?.image?.[0]) || (req.files?.blogImage?.[0]);
    const blog = await BlogPostModel.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category || "General",
      username: req.body.username || "Admin",
      occupation: req.body.occupation || "Admin",
      postDate: req.body.postDate ? new Date(req.body.postDate) : new Date(),
      blogImage: file?.filename || null
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Create blog failed" });
  }
});

/* =============================
   GET – Blogs (pagination + search)
============================= */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";
    const category = req.query.category;

    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } }
      ];
    }

    const blogs = await BlogPostModel.find(query)
      .sort({ postDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await BlogPostModel.countDocuments(query);

    res.json({
      blogs,
      total,
      totalPages: Math.ceil(total / limit),
      page
    });
  } catch (err) {
    res.status(500).json({ error: "Fetch blogs failed" });
  }
});

/* =============================
   GET – All blogs (no pagination)
============================= */
router.get("/AllBlogs", async (req, res) => {
  try {
    const blogs = await BlogPostModel.find().sort({ postDate: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ error: "Fetch blogs failed" });
  }
});

/* =============================
   DELETE – Blog by ID
============================= */
router.delete(["/:id", "/Blogpost/:id"], async (req, res) => {
  try {
    await BlogPostModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* =============================
   GET – Single blog
============================= */
router.get("/:id", async (req, res) => {
  const blog = await BlogPostModel.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).json({ message: "Not found" });
});

module.exports = router;
