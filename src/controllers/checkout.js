const checkoutService = require("../services/checkout");

async function getCheckoutPage(req, res) {
  const redirectStatus = req.query?.redirect_status == "succeeded";

  if (redirectStatus) {
    await checkoutService.checkoutCart(req.session.username || "ido@gmail.com");
  }

  res.render("payment");
}

async function createPaymentIntent(req, res) {
  const paymentIntent = await checkoutService.createPaymentIntent(
    req.session.username
  );

  if (paymentIntent.code == 400) {
    return res.status(400).json({ error: paymentIntent.message });
  }
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = { getCheckoutPage, createPaymentIntent };
