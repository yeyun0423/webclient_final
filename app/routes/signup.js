//경로 ./app/routes/signup.js

const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");

// POST /signup 라우트 - 회원가입 정보를 받아서 MongoDB에 저장
router.post("/signup", createUser);

module.exports = router;
