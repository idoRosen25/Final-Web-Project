const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../controllers/user");
const orderController = require("../controllers/order");

router.get("/statistics", async (req, res) => {
  console.log("in stats page");
  res.render("statistics");
});
//get orders for user
router.get("/", isLoggedIn, orderController.getOrdersByUserId);

//get order by id
router.get("/:id", isLoggedIn, orderController.getOrdersById);

module.exports = router;
