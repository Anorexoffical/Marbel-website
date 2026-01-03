const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routers
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3001;

// Upload folder
const uploadDir = path.join(__dirname, "uploads");

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",               // local frontend
    "https://www.wahatalhijazmarble.com"  // production frontend
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/marble")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Mount routers
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
