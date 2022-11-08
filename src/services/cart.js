const cartModel = require("../models/cart");
const { getProductById } = require("./product");
const { createOrder } = require("./order");
const { ObjectId } = require("mongodb");

async function getCart(email) {
  const userCart = await cartModel
    .findOne({ email })
    .populate("products.productId");

  return userCart.products.length
    ? userCart.products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }))
    : [];
}

async function clearCart(email) {
  try {
    return await cartModel.findOneAndUpdate({ email }, { products: [] });
  } catch (error) {
    throw { code: 400, message: "Couldn't clear cart" };
  }
}

async function checkoutCart(email) {
  const checkoutProducts = await getCart(email);

  if (checkoutProducts.length > 0) {
    try {
      const order = await createOrder(email, checkoutProducts);

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

async function addProductToCart(email, { productId, amount = 1 }) {
  try {
    const parsedAmount = parseInt(amount);

    const cart = await cartModel.findOne({ email });

    if (cart) {
      let exist = false;
      for (let i = 0; i < cart.products.length && !exist; i++) {
        if (cart.products[i].productId.toString() == productId) {
          exist = true;
          if (cart.products[i].quantity + parsedAmount <= 0) {
            cart.products.splice(i, 1);
          } else {
            cart.products[i].quantity += parsedAmount;
          }
        }
      }

      return await cartModel.findOneAndUpdate(
        { email },
        exist
          ? { products: cart.products }
          : { $push: { products: { productId, quantity: parsedAmount } } }
      );
    }

    return await new cartModel({
      email,
      products: [{ productId, quantity: parsedAmount }],
    }).save();
  } catch (err) {
    throw { code: 400, message: "Couldn't add product to cart" };
  }
}

async function removeProductFromCart(email, { itemId }) {
  try {
    if (!email || !itemId) {
      throw { code: 400, message: "Couldn't remove product from cart" };
    }
    const cart = await cartModel.findOneAndUpdate(
      { email },
      { $pull: { products: { productId: ObjectId(itemId) } } }
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCart,
  clearCart,
  checkoutCart,
  addProductToCart,
  removeProductFromCart,
};
