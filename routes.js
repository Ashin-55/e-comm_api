const router = require("express").Router();

const CART = require("./model/cartModel");
const PRODUCTS = require("./model/productModel");
const REVIEWS = require("./model/reviewsModel");

router.get("/products", async (req, res, next) => {
  //return all products
  try {
    const products = await PRODUCTS.find();
    res.status(200).json({ message: "Ok", products: products });
  } catch (error) {
    console.log("the fetch product error", error);
    res.status(400).json({ message: "failed to fetch all products" });
  }
});
router.post("/products", async (req, res, next) => {
  try {
    console.log("the products data", req.body);
    const result = await PRODUCTS.create();
    res.status(200).json({ message: "product is created", result: result });
  } catch (error) {
    console.log("create products error", error);
    res.status(400).json({ message: "failed to add products" });
  }
});
router.get("/products/:id", async (req, res, next) => {
  //return all details of the products
  try {
    const id = req.params.id;
    const product = await PRODUCTS.findById(id);
    res.status(200).json({ message: "success", product: product });
  } catch (error) {
    console.log("the single product fetch details", error);
    res.status(400).json({ message: "Failed to get details" });
  }
});
router.get("/cart", async (req, res, next) => {
  //return all products added to the cart
  try {
    const items = await CART.find();
    console.log("the cart items is ", items);
    res.status(200).json({ message: "success", items: items });
  } catch (error) {
    console.log("the cart error is ", error);
    res.status(400).json({ message: "failed to get cart items" });
  }
});
router.post("/cart/:id", async (req, res, next) => {
  //add products with id to the cart
  const productId = req.params.id;
  const { userName } = req.body;
  const data = {
    userName: userName,
    productId: productId,
  };
  try {
    const user = await CART.find({ userName: userName });
    if (user.length > 0) {
      const itempresent = user[0].productId.some(function (item) {
        return item.equals(productId);
      });
      if (!itempresent) {
        CART.updateOne(
          { userName: userName },
          { $addToSet: { productId: productId } }
        )
          .exec()
          .then((response) => {
            res
              .status(200)
              .json({ message: "added to cart", result: response });
          });
      } else {
        console.log("item allready present");
        res.status(400).json({ message: "item is allready present" });
      }
    } else {
      const resposn = await CART.create(data);
      res.status(200).json({ message: "success", response: resposn });
    }
  } catch (error) {
    console.log("the add to cart error", error);
    res.status(400).json({ message: "failed to add to cart" });
  }
});
router.delete("/cart/:id", async (req, res, next) => {
  //delete product from cart
  const id = req.params.id;
  const { userName } = req.body;
  try {
    CART.updateOne({ userName: userName }, { $pull: { productId: id } })
      .exec()
      .then((response) => {
        res
          .status(200)
          .json({ message: "product removed from cart", response: response });
      });
  } catch (error) {
    console.log("the delete from cart error is ", error);
    res.status(400).json({ message: "failed to delete from cart" });
  }
});
router.post("/review/:id", async (req, res, next) => {
  //aadd review of the product with id
  const id = req.params.id;
  const { userName, star, review } = req.body;
  const data = {
    productId: id,
    review: review,
    star: star,
    userName: userName,
  };
  try {
    const revPresent = await REVIEWS.findOne({
      userName: userName,
      productId: id,
    });
    if (revPresent) {
      res.status(400).json({ message: "review allready added" });
    } else {
      const revResponse = await REVIEWS.create(data);
      res
        .status(200)
        .json({ message: "review created ", response: revResponse });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to add review" });
  }
});

module.exports = router;
