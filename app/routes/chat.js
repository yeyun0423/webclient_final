//경로 /app/routes/chat.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/chatRoom", chatController.getMessages);
router.post("/chatRoom", chatController.postMessage);
router.get("/chatlist", chatController.chatList);
router.post("/chatAdd", chatController.createRoom);

module.exports = router;
