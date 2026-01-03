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
// Accept both 'image' and 'blogImage' keys from frontend
const uploadImageFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'blogImage', maxCount: 1 }
]);

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
router.post("/", uploadImageFields, async (req, res) => {
  try {
    const file = (req.files?.image?.[0]) || (req.files?.blogImage?.[0]);
    const blog = await BlogPostModel.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category || "General",
      username: req.body.username || "Admin",
      occupation: req.body.occupation || "Admin",
      postDate: new Date(),
      blogImage: file?.filename || null
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Create blog failed" });
  }
});

/* =============================
   PUT – Update blog
============================= */
router.put("/:id", uploadImageFields, async (req, res) => {
  try {
    const blogId = req.params.id;

    const updateData = {
      title: req.body.title,
      body: req.body.body,
      category: req.body.category || "General",
      username: req.body.username || "Admin",
      occupation: req.body.occupation || "Admin",
      postDate: req.body.postDate || new Date(),
    };

    const file = (req.files?.image?.[0]) || (req.files?.blogImage?.[0]);
    if (file) updateData.blogImage = file.filename;

    const updatedBlog = await BlogPostModel.findByIdAndUpdate(blogId, updateData, { new: true });

    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.json(updatedBlog);
  } catch (err) {
    console.error("❌ BLOG UPDATE ERROR:", err);
    res.status(500).json({ error: "Update blog failed" });
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
  try {
    const blog = await BlogPostModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid blog ID" });
  }
});

module.exports = router;
