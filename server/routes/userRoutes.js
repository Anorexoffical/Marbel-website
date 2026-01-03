const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModels");

// ----------------------------
// User Login
// ----------------------------
router.post("/auth", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
