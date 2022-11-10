const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { isAdmin } = require("../controllers/user");
const cartModel = require("../models/cart");

const sumTotalAount = async () => {
  //   const email = req.session.username;

  const myCart = await cartModel
    .findOne({ user: "ido@gmail.com" })
    .populate("products.productId");

  const total = myCart.products.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  return total;
};

router.get("/create-payment", async (req, res) => {
  res.render("payment");
});

router.post("/create-payment", async (req, res) => {
  const amount = await sumTotalAount();
  console.log("amount for payment: ", amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });

  console.log("paymentIntent: ", paymentIntent);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
