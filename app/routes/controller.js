const login = (req, res) => {
  res.render("login");
};

const signup = (req, res) => {
  res.render("signup");
};
const chat = (req, res) => {
  res.render("chat");
};

module.exports = {
  login,
  signup,
  chat,
};
