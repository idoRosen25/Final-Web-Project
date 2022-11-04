const orderService = require("../services/order");

async function getOrdersByUserId(req, res) {
  res.render("orders/" + res.session?.username, {
    orderList: await orderService.getOrdersByUserId(req.session?.username),
  });
}
async function getOrdersStatistics(req, res) {}

async function getOrdersById(req, res) {
  res.render("orders", {
    order: await orderService.getOrderById(req.params.id),
  });
}
module.exports = { getOrdersByUserId, getOrdersStatistics, getOrdersById };
