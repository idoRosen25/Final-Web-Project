const orderModel = require("../models/order");
const { ObjectId } = require("mongodb");

async function createOrder(email, products, totalPrice) {
  try {
    const newOrder = new orderModel({
      email,
      products,
      totalPrice,
      date: new Date().getTime(),
    });
    return await newOrder.save();
  } catch (error) {
    throw {
      code: 400,
      message: "Couldn't create order. Please try again later",
    };
  }
}

async function getOrdersByUserId(email) {
  try {
    const orders = await orderModel.find({ email });
    return orders;
  } catch (error) {
    return [];
  }
}

async function getOrderById(orderId) {
  try {
    if (!orderId)
      throw {
        code: 400,
        message: "Couldn't get order. Please try again later",
      };

    const order = await orderModel
      .findOne({ _id: ObjectId(orderId) })
      .populate("products.product");

    return order;
  } catch (error) {
    return {
      code: 400,
      message: "Couldn't get order. Please try again later",
    };
  }
}

module.exports = { createOrder, getOrdersByUserId, getOrderById };
