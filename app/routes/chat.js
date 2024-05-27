//경로 /app/routes/chat.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/chat", chatController.getMessages);
router.post("/chat", chatController.postMessage);
router.get("/chatlist", chatController.chatList);
router.post("/createChat", chatController.createChat);

module.exports = router;
