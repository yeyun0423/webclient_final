//경로 /app/routes/chat.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/getMessage", chatController.getMessages);
router.post("/sendMessage/:id", chatController.postMessage);
router.get("/chatlist", chatController.chatList);
router.post("/chatAdd", chatController.createRoom);
router.get("/chat/:_id", chatController.enterRoom);
router.get("/getUserRooms", chatController.fetchChatRooms);
module.exports = router;
