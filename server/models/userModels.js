// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // Optional

});

const UserModels = mongoose.model('user', userSchema, 'user');

module.exports = UserModels;
