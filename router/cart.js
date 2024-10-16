const express = require("express");
const router = express.Router();
const cartController = require("../controllers/Cart");
const authMiddelware = require("../middelware/authMiddelware");


//add to cart
router.route("/add").post(authMiddelware,cartController.addToCart);


//get cart
router.route("/get").get(authMiddelware,cartController.getCart);

//decrease qty
router.route("/-qty").post(authMiddelware,cartController.decreaseQty);

//delete product
router.route("/delete/:productId").delete(authMiddelware,cartController.deleteProduct);

//remove all product
router.route("/clear").delete(authMiddelware,cartController.removeAllProduct);


module.exports = router;