const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const BlogPostModel = require("../models/BlogPostModel");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// Blog Routes
router.post("/Blogpost", upload.single("blogImage"), async (req, res) => {
  try {
    const newBlog = await BlogPostModel.create({ ...req.body, blogImage: req.file?.filename || null });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: "Error creating blog post", details: err });
  }
});

router.get("/Blogposts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
        const search = req.query.search || "";
        const category = req.query.category;

        // Build optional filters
        const query = {};
        if (category) query.category = category;
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { body: { $regex: search, $options: "i" } },
          ];
        }

        const blogs = await BlogPostModel.find(query)
          .sort({ postDate: -1 })
          .skip((page - 1) * limit)
          .limit(limit);

        const totalBlogs = await BlogPostModel.countDocuments(query);

        res.json({ blogs, page, totalPages: Math.ceil(totalBlogs / limit), totalBlogs });
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

/* =============================
   GET – All Blogs
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

// Remove duplicated AllBlogs route

// Delete by id
router.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await BlogPostModel.find());
  } catch (err) {
    res.status(500).json({ error: "Error fetching all blogs" });
  }
});

router.delete("/Blogpost/:id", async (req, res) => {
  try {
    const deletedBlog = await BlogPostModel.findByIdAndDelete(req.params.id);
    res.status(deletedBlog ? 200 : 404).json({ message: deletedBlog ? "Blog deleted" : "Blog not found" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting blog" });
  }
});

router.put("/Blogpost/:id", upload.single("blogImage"), async (req, res) => {
  try {
    const updatedBlog = await BlogPostModel.findByIdAndUpdate(req.params.id, { ...req.body, blogImage: req.file?.filename }, { new: true });
    res.status(updatedBlog ? 200 : 404).json(updatedBlog || { message: "Blog not found" });
  } catch (err) {
    res.status(500).json({ error: "Error updating blog" });
  }
});

router.get("/Blogpost/:id", async (req, res) => {
  try {
    const blogPost = await BlogPostModel.findById(req.params.id);
    res.status(blogPost ? 200 : 404).json(blogPost || { message: "Blog post not found" });
  } catch (err) {
    res.status(500).json({ error: "Error fetching blog post" });
  }
});

module.exports = router;
