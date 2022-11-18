const { format, add } = require("date-fns");
const orderModel = require("../models/order");

// Helpers For Range Calculations
const rangeCount = {
  week: 7,
  month: 1,
  year: 12,
};

function rangeArrays(range) {
  const today = new Date();

  if (range == "month") {
    let month = [];
    for (let i = 0; i < 30; i++) {
      month.push({
        name: format(add(today, { days: -i }), "MM-dd"),
        orderCount: 0,
      });
    }
    return month;
  } else if (range == "year") {
    let year = [];
    for (let i = 0; i < 12; i++) {
      year.push({
        name: format(add(today, { months: -i }), "MM-yyyy"),
        orderCount: 0,
      });
    }
    return year;
  } else {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        name: format(add(today, { days: -i }), "MM-dd"),
        orderCount: 0,
      });
    }
    return week;
  }
}

function calculateRangeStartEnd(range) {
  const today = new Date();
  let startDate;
  let searchFormat;
  switch (range) {
    case "month":
      searchFormat = "%m-%d";
      startDate = new Date(add(today, { months: -rangeCount[range] }));
      break;
    case "year":
      searchFormat = "%m-%Y";
      startDate = new Date(add(today, { months: -rangeCount[range] }));
      break;
    default:
      searchFormat = "%m-%d";
      startDate = new Date(add(today, { days: -rangeCount[range] }));
      break;
  }
  return { startDate, today, searchFormat };
}

// Actual Services
async function getOrdersByRange(range = "week") {
  const { startDate, today, searchFormat } = calculateRangeStartEnd(range);
  try {
    const stats = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),

            $lte: new Date(today),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: searchFormat, date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const graphData = stats.map((order) => {
      return {
        name: order._id,
        orderCount: order.count,
      };
    });

    const fullRangeData = rangeArrays(range).reverse();
    for (let i = 0; i < graphData.length; i++) {
      const dateFromDB = fullRangeData.find((item) =>
        item.name.includes(graphData[i].name)
      );

      if (dateFromDB) {
        dateFromDB.orderCount = graphData[i].orderCount;
      }
    }

    const rangeOptions = {
      data: fullRangeData,
      title: { text: "Orders by range" },
      subtitle: {
        text: `Last ${range}: today - ${format(startDate, "m/d/Y")}`,
      },
    };

    return rangeOptions;
  } catch (err) {
    console.error("error on range stats: ", err);
  }
}

async function getTopCategories() {
  try {
    const stats = await orderModel.find({}).populate("products.product");
    let allProducts = [];
    stats.forEach((order) =>
      order.products.forEach((product) => allProducts.push(product.product))
    );

    const itemsCounter = {};

    allProducts.forEach((product) => {
      if (itemsCounter[product.category]) {
        itemsCounter[product.category] += 1;
      } else {
        itemsCounter[product.category] = 1;
      }
    });
    return {
      data: Object.keys(itemsCounter)
        .map((key) => ({
          name: key,
          orderCount: itemsCounter[key],
        }))
        .reverse(),
      title: { text: "Top Selling Categories" },
    };
  } catch (error) {
    console.error("error on top cat stats: ", error);
    return null;
  }
}

async function getTopUsers() {
  try {
    const stats = await orderModel
      .aggregate([
        {
          $group: {
            _id: "$email",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .limit(5);
    return {
      data: stats
        .map((user) => ({
          name: user._id,
          orderCount: user.count,
        }))
        .reverse(),
      title: { text: "Top Selling Categories" },
    };
  } catch (error) {}
}

module.exports = { getOrdersByRange, getTopCategories, getTopUsers };
