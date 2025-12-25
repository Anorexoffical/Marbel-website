const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const app = express();
const PORT = 3001;
const uploadDir = path.join(__dirname, "uploads");
// Middleware
app.use(cors({
  origin: ["https://marble-domain","http://localhost:3000", "http://localhost:5173"], // Allow only your production domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/marble")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Mount routers
 app.use('/api/blogs', blogRoutes);
 app.use('/api/user', userRoutes);


// Start the server (No SSL, since it will be handled by Nginx or a reverse proxy)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
