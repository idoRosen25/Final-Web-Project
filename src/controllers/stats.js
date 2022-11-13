const statsService = require("../services/stats");

async function getByRange(req, res) {
  console.log("req params: ", req.params);
  const { range } = req.body;

  try {
    const rangeStats = await statsService.getByRange(range);
    console.log("range stats: ", rangeStats);
    res.json({ message: "this is data", range: rangeStats });
  } catch (err) {}
}

module.exports = { getByRange };
