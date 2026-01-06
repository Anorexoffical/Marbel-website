// server.js - UPDATED VERSION
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Make sure these paths are correct
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const createAdminUser = require("./createAdmin"); // IMPORT the function

const app = express();
const PORT = process.env.PORT || 3008;

// Uploads folder
const uploadDir = path.join(__dirname, "uploads");

// Create uploads directory if it doesn't exist
const fs = require("fs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ].filter(Boolean), // Remove falsy values
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use("/uploads", express.static(uploadDir));
app.use("/api/uploads", express.static(uploadDir)); // Also expose under /api

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/marble")
  .then(async () => {
    console.log("✅ MongoDB connected");
    
    // Create admin user on startup
    await createAdminUser();
  })
  .catch(err => console.error("❌ Mongo error:", err));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    backend: "running",
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "Blog API Server", 
    endpoints: {
      getAllBlogs: "GET /api/blogs/Blogposts",
      getSingleBlog: "GET /api/blogs/Blogpost/:id",
      createBlog: "POST /api/blogs/Blogpost",
      health: "GET /api/health"
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📝 Test the API at http://localhost:${PORT}/api/blogs/Blogposts`);
});