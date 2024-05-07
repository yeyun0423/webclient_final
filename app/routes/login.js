//경로 ./app/routes/login.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", auth);

module.exports = router;
