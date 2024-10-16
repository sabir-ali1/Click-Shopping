const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderConfirm");
const authMiddelware = require("../middelware/authMiddelware");


//add order confirm
router.route("/add").post(authMiddelware,orderController.addOrderConfirm);


module.exports = router