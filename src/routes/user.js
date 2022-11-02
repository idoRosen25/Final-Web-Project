const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getUser);
router.put("/", userController.updateUser);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
