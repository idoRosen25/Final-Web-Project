const client = require("../models/db");
const Cart = require("../models/cart");
const { getProductById } = require("./product");
const { createOrder } = require("./order");

async function getCart(email) {
  await client.connect();

  const cart = await Cart.findOne({ email, isPaid: false });
  if (cart?.produts?.length) {
    return await cart.products.map(async (prodcut) => {
      return {
        quantity: prodcut.quantity,
        ...(await getProductById(prodcut.id)),
      };
    });
  }
  return [];
}

async function clearCart(email) {
  await client.connect();
  try {
    await client.db("storeDB").collection("carts").deleteOne({ email });
  } catch (error) {
    throw { code: 400, message: "Couldn't clear cart" };
  }
}

async function checkoutCart(email) {
  await client.connect();
  const checkout = await client
    .db("storeDB")
    .collection("carts")
    .findOne({
      email,
      products: { $gt: [{ $size: "$arr" }, 0] },
    });
  if (checkout) {
    try {
      const order = await createOrder(
        checkout.email,
        checkout.products,
        checkout.products.reduce(async (acc, item) => {
          const product = await getProductById(item.id);
          return acc + product.price * item.quantity;
        })
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

async function addProductToCart(email, { productId, amount = 1 }) {
  try {
    const parsedAmount = parseInt(amount);

    await client.connect();
    const cart = await client
      .db("storeDB")
      .collection("carts")
      .findOne({ email, isPaid: false });

    if (cart) {
      let exist = false;
      for (let i = 0; i < cart.products.length && !exist; i++) {
        if (cart.products[i].id == productId) {
          exist = true;
          if (cart.products[i].quantity + parsedAmount <= 0) {
            cart.products.splice(i, 1);
          } else {
            cart.products[i].quantity += parsedAmount;
          }
        }
      }

      return await client
        .db("storeDB")
        .collection("carts")
        .updateOne(
          { email },
          exist
            ? { $set: { products: cart.products } }
            : { $push: { products: { id: productId, quantity: parsedAmount } } }
        );
    }

    return await client
      .db("storeDB")
      .collection("carts")
      .insertOne({
        email,
        products: [{ id: productId, quantity: parsedAmount }],
      });
  } catch (err) {
    throw { code: 400, message: "Couldn't add product to cart" };
  }
}

async function removeProductFromCart(email, itemId) {
  try {
    if (!email || !itemId) {
      throw { code: 400, message: "Couldn't remove product from cart" };
    }
    await client.connect();
    return await client
      .db("storeDB")
      .collection("carts")
      .updateOne({ email }, { $pull: { products: { id: itemId } } });
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
