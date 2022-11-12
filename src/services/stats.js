const orderModel = require("../models/order");

async function getByRange(range) {
  try {
    const stats = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%m-%d-%Y", date: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("stats in service: ", stats);
    return stats;
  } catch (err) {
    console.log("error on range stats: ", err);
  }
}

module.exports = { getByRange };
