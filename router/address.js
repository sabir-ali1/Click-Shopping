const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address");
const authMiddelware = require("../middelware/authMiddelware");


//add address
router.route("/add/address").post(authMiddelware,addressController.addAddress);


//get address
router.route("/get/address").get(authMiddelware,addressController.getAddress);


module.exports = router;