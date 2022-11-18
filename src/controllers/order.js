const orderService = require("../services/order");

async function getOrdersByUserId(req, res) {
  res.render("orders", {
    orderList: await orderService.getOrdersByUserId(req.session.username),
  });
}
async function getOrdersStatistics(req, res) {}

async function getOrdersById(req, res) {
  const order = await orderService.getOrderById(
    req.session.username,
    req.params.id
  );
  res.render("orderView", {
    order,
  });
}
module.exports = { getOrdersByUserId, getOrdersStatistics, getOrdersById };
