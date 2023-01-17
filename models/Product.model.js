const { Schema, model } = require("mongoose");
const categoryList = require("../utils/categoryList");

const productSchema = new Schema({
  name: String,
  tagline: String,
  price: Number,
  details: String,
  discount: Number,
  gallery: {
    type: [String],
  },
  category: {
    type: String,
    enum: categoryList,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
