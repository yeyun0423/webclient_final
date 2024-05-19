//경로 /app/routes/friend.js
const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.post("/add", friendController.addFriend);
router.delete("/remove/:friendEmail", friendController.removeFriend);
module.exports = router;
