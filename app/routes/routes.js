const express = require("express");
const router = express.Router();

// 컨트롤러 가져오기
const controller = require("./controllers");

// 라우터 설정
router.get("/", controller.login);
router.get("/chat", controller.chat);
router.get("/signup", controller.signup);
router.get("/info", controller.chatInfo);

module.exports = router;
