require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Uploads folder
const uploadDir = path.join(__dirname, "uploads");

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

// Health check (IMPORTANT)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", backend: "running" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
