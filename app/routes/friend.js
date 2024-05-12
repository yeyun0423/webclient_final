//경로 /app/routes/friend.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const friendController = require("../controllers/friendController");

router.post("/add", friendController.addFriend);

module.exports = router;
