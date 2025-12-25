const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  postDate: String,
  category: String,
  username: String,
  occupation: String,
  title: String,
  body: String,
  blogImage: String,
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
