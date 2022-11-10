const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");
const checkoutController = require("../controllers/checkout");

router.get("/create-payment", isLoggedIn, checkoutController.getCheckoutPage);

router.post(
  "/create-payment",
  isLoggedIn,
  checkoutController.createPaymentIntent
);
module.exports = router;
