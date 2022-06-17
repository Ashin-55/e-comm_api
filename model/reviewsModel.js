const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "PRODUCTS" },
    review: { type: String },
    star: { type: Number },
    userName:{type:String}
  },
  { timestamps: true, collection: "REVIEWS" }
);
const REVIEWS = mongoose.model("REVIEWS", reviewSchema);
module.exports = REVIEWS;
