const express = require("express");
const router = express.Router();

const loginController = require("../controllers/user");

//get user by ID
//edit user by ID
router.post("/login", loginController.login);
router.post("/register", loginController.register);

module.exports = router;
