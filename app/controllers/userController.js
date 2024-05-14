//경로 app/controllers/userController.js
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    // 요청에서 회원가입 정보 추출
    const { email, password, name } = req.body;

    // DB에서 해당 이메일이 사용되고 있는지 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // 이미 사용 중인 이메일이 있다면 클라이언트에 에러 응답
      return res.status(400).json({ msg: "이미 사용 중인 이메일입니다." });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // MongoDB에 새로운 사용자 생성
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    console.log(newUser);
    // MongoDB에 새로운 사용자 저장
    await newUser.save();

    // 회원가입 성공 응답, 사용자를 로그인 페이지로 리디렉션
    res.render("login");
  } catch (err) {
    // 오류 처리
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("friends"); // 친구 목록을 포함하여 사용자 정보를 조회
    if (!user) {
      return res.status(400).json({ msg: "존재하지 않는 사용자입니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "잘못된 비밀번호입니다." });
    }

    const token = jwt.sign({ email: user.email }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.render("chat-info", {
      name: user.name,
      userEmail: user.email,
      friends: user.friends,
    }); // 친구 목록을 뷰로 전달
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = { createUser, login };
