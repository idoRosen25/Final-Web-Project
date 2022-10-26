const loginService = require("../services/user");

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

  if (user) {
    console.log("user from db: ", user);
    req.session.username = email;
    req.session.role = user.role;
    res.json({ status: "success", code: 200, user });
  } else {
    res.json({ status: "error", code: 401, message: "No User Found" });
  }
}

async function register(req, res) {
  console.log("in register controller");
  const { email, password, firstName, lastName, gender, age, role } = req.body;

  try {
    const register = await loginService.registerUser(
      email,
      password,
      firstName,
      lastName,
      gender,
      age,
      role
    );
    console.log("register: ", register);
    req.session.username = email;
    res.redirect("/");
  } catch (error) {
    console.error("register error: ", error);
    res.json({
      status: "error",
      code: error.code,
      error: error.message,
    });
  }
}
module.exports = { login, register, isLoggedIn, isAdmin };
