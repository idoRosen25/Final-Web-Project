const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../controllers/user");
const orderController = require("../controllers/order");

//get orders for user
router.get("/", isLoggedIn, orderController.getOrdersByUserId);

//get order by id
router.get("/:id", isLoggedIn, orderController.getOrdersById);

module.exports = router;
