const express = require("express");
const router = express.Router();
const UserModels = require("../models/userModels");

// User Authentication
router.post("/auth", async (req, res) => {
  try {
    const user = await UserModels.findOne({ userName: req.body.userName });
    res.status(user && user.password === req.body.password ? 200 : 401).json({ message: user ? "Login successful" : "Invalid username or password" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
