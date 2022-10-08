const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("test login", email, password);

  await client.connect();
  const user = await client
    .db(dbName)
    .collection("users")
    .find({ email, password })
    .toArray();

  console.log("user from db: ", user);
  if (user.length) {
    return user[0];
  } else {
    res.code = 401;
    res.message = "No User Found";
  }
});

module.exports = router;
