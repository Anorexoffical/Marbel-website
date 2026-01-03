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
   GET – All blogs (no pagination)
   MUST COME BEFORE param routes
============================= */
router.get("/AllBlogs", async (req, res) => {
  try {
    const blogs = await BlogPostModel.find().sort({ postDate: -1 });
    res.json({ blogs });
  } catch (err) {
    console.error("❌ BLOG FETCH ERROR:", err);
    res.status(500).json({ error: "Fetch blogs failed" });
  }
});

/* =============================
   POST – Create blog
============================= */
router.post("/", upload.single("blogImage"), async (req, res) => {
  try {
    const blog = await BlogPostModel.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category || "General",
      username: req.body.username || "Admin",
      occupation: req.body.occupation || "Admin",
      postDate: new Date(),
      blogImage: req.file?.filename || null
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
   GET – Single blog
============================= */
router.get("/:id", async (req, res) => {
  const blog = await BlogPostModel.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).json({ message: "Not found" });
});

module.exports = router;
