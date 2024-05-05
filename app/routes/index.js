const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/info", (req, res) => {
  res.render("chat_info");
});

module.exports = router;
