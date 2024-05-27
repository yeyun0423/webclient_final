//경로 /app/routes/routes
const express = require("express");
const router = express.Router();

// 컨트롤러 가져오기
const controller = require("./controller");

// 라우터 설정
router.get("/login", controller.login);
router.get("/signup", controller.signup);

module.exports = router;
