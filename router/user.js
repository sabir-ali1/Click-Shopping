const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddelware = require("../middelware/authMiddelware");


//register router
router.route("/register").post(userController.register);

//login router
router.route("/login").post(userController.login);

//get user data router
router.route("/user").get(authMiddelware,userController.getUser);


module.exports = router;