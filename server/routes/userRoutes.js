const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModels");

// LOGIN
router.post("/auth", async (req, res) => {
  try {
    const userName = req.body.userName || req.body.username;
    const { password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // First try bcrypt compare
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      isMatch = false;
    }

    // If bcrypt compare fails, check for legacy plain-text password and migrate
    if (!isMatch) {
      const looksHashed = typeof user.password === "string" && user.password.startsWith("$2");
      if (!looksHashed && user.password === password) {
        const newHash = await bcrypt.hash(password, 10);
        user.password = newHash;
        await user.save();
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
