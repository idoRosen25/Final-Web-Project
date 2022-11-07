const Order = require("../models/order");
const client = require("../models/db");
const { ObjectId } = require("mongodb");
const { getProductById } = require("./product");

async function createOrder(email, products, totalPrice) {
  const newOrder = new Order({
    email,
    products,
    totalPrice,
    date: new Date().getTime(),
  });

  try {
    await client.connect();
    return await client.db("storeDB").collection("orders").insertOne(newOrder);
  } catch (error) {
    throw {
      code: 400,
      message: "Couldn't create order. Please try again later",
    };
  }
}

async function getOrdersByUserId(email) {
  try {
    await client.connect();
    return (
      (await client
        .db("storeDB")
        .collection("orders")
        .find({ email })
        .toArray()) || []
    );
  } catch (error) {
    throw {
      code: 400,
      message: "Couldn't get orders. Please try again later",
    };
  }
}

async function getOrderById(orderId) {
  try {
    if (!orderId)
      throw {
        code: 400,
        message: "Couldn't get order. Please try again later",
      };

    await client.connect();

    const order = await client
      .db("storeDB")
      .collection("orders")
      .findOne({ _id: ObjectId(orderId) });

    order.products = order.products.map(async (product) => {
      const prod = await getProductById(product.id);
      return { ...prod, quantity: product.quantity };
    });
    return order;
  } catch (error) {
    return {
      code: 400,
      message: "Couldn't get order. Please try again later",
    };
  }
}

module.exports = { createOrder, getOrdersByUserId, getOrderById };
