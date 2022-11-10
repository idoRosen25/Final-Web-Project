const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const cartModel = require("../models/cart");
const { createOrder } = require("./order");
const { getCart, clearCart } = require("./cart");

const sumTotalAount = async (email) => {
  const myCart = await cartModel
    .findOne({ user: email })
    .populate("products.productId");

  const total = myCart.products.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  return total;
};

async function createPaymentIntent(email) {
  const checkoutProducts = await getCart(email);

  const amount = await sumTotalAount();
  if (checkoutProducts.length < 1 || amount <= 0.5) {
    return { code: 400 };
  }
  return await stripe.paymentIntents.create({
    amount: amount * 10,
    currency: "usd",
  });
}

async function checkoutCart(email) {
  const checkoutProducts = await getCart(email);

  if (checkoutProducts.length > 0) {
    try {
      const order = await createOrder(
        email,
        checkoutProducts,
        await sumTotalAount()
      );

      if (order) {
        await clearCart(email);
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw { code: 400, message: "Couldn't checkout cart" };
    }
  } else {
    throw { code: 400, message: "Couldn't checkout cart" };
  }
}
module.exports = { createPaymentIntent, checkoutCart };
