const loginService = require("../services/login");
function isLoggedIn(req, res, next) {
  req.session.username ? next() : res.redirect("/");
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await loginService.login(email, password);

  if (user.length) {
    req.session.username = email;
    res.redirect("/");
  } else {
    res.code = 401;
    res.message = "No User Found";
    res.render("/login=error");
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
  }
}
module.exports = { login };
