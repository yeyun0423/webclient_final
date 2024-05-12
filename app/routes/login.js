//경로 /app/routes/login.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/info", userController.login);

module.exports = router;
