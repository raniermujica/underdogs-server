const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: String,
  text: String, 
  images: {
    type: [String]
  },
})

const Blog = model("Blog", blogSchema)
module.exports = Blog;