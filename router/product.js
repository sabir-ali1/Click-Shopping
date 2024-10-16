const express = require("express");
const router = express.Router();
const productRouter = require("../controllers/product");


//add product 
router.route('/add').post(productRouter.addProduct);

//get product 
router.route("/get").get(productRouter.getProduct);

//edit product
router.route("/update/:id").post(productRouter.editProduct);

//get single product 
router.route("/single/:id").get(productRouter.getSingelProduct);


module.exports = router;