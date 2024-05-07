const login = (req, res) => {
  res.render("login");
};

const signup = (req, res) => {
  res.render("signup");
};

const chat = (req, res) => {
  res.render("chat");
};

const chatInfo = (req, res) => {
  res.render("chat-info");
};

module.exports = {
  login,
  signup,
  chat,
  chatInfo,
};
