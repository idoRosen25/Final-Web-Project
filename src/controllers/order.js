const orderService = require("../services/order");

async function getOrdersByUserId(req, res) {
  res.render("orders", {
    orderList: await orderService.getOrdersByUserId(
      req.session.username || "ido@gmail.com"
    ),
  });
}
async function getOrdersStatistics(req, res) {}

async function getOrdersById(req, res) {
  const order = await orderService.getOrderById(
    req.session.username || "ido@gmail.com",
    req.params.id
  );
  console.log("order in control: ", order.products[0].product);
  res.render("ordersView", {
    order,
  });
}
module.exports = { getOrdersByUserId, getOrdersStatistics, getOrdersById };
