const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/login", controller.login);
router.get("/signup", controller.signup);

module.exports = router;
