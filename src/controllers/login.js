const loginService = require("../services/login");

function isLoggedIn(req, res, next) {
  req.session.username ? next() : res.redirect("/");
}

function isAdmin(req, res, next) {
  req.session.username && req.session.role === "admin"
    ? next()
    : res.redirect("/");
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await loginService.login(email, password);

  if (user.length) {
    console.log("user from db: ", user);
    req.session.username = email;
    req.session.role = user[0].role;
    res.json({ status: "success", code: 200, user: user[0] });
  } else {
    res.json({ status: "error", code: 401, message: "No User Found" });
  }
}

async function register(req, res) {
  const { email, password, firstName, lastName, gender } = req.body;

  try {
    await loginService.registerUser(
      email,
      password,
      firstName,
      lastName,
      gender
    );
    req.session.username = email;
    res.redirect("/");
  } catch (error) {
    console.error("register error: ", error);
    res.code = 401;
    res.message = "No User Found";
    res.render("/error?register");
  }
}
module.exports = { login, register, isLoggedIn, isAdmin };
