//경로 /app/routes/friend.js
const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/add", friendController.addFriend);
router.delete(
  "/remove/:friendEmail",
  // authenticateToken,
  friendController.removeFriend
);

module.exports = router;
