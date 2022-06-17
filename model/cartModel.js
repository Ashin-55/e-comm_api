const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userName:{type:String},
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "PRODUCTS" }],
  },
  {
    timestamps: true,
    collection: "CART",
  }
);
const CART = mongoose.model("CART", cartSchema);
module.exports = CART;
