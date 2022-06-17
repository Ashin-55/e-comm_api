const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  { timestamps: true, collection: "PRODUCTS" }
);
const PRODUCTS = mongoose.model("PRODUCTS", productSchema);
module.exports = PRODUCTS;
