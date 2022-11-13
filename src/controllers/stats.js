const statsService = require("../services/stats");

async function getOrdersByRange(req, res) {
  const { range } = req.params;

  try {
    const rangeOptions = await statsService.getOrdersByRange(range);
    if (rangeOptions.data) {
      res.json({ message: "this is data", rangeOptions });
    } else {
      throw { message: "this is data", rangeOptions: {} };
    }
  } catch (err) {
    throw err;
  }
}

async function getTopCategories(req, res) {
  try {
    const stats = await statsService.getTopCategories();

    if (stats) {
      res.json({ status: "success", code: 200, stats });
    } else {
      throw { status: "error", code: 400, rangeOptions: {} };
    }
  } catch (err) {
    throw err;
  }
}

async function getTopUsers(req, res) {
  try {
    const stats = await statsService.getTopUsers();
    if (stats) {
      res.json({ status: "success", code: 200, stats });
    } else {
      throw { status: "error", code: 400, rangeOptions: {} };
    }
  } catch (error) {
    return error;
  }
}
module.exports = { getOrdersByRange, getTopCategories, getTopUsers };
