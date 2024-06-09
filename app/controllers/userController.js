const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "이미 사용 중인 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.render("login");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("friends");
    if (!user) {
      return res.status(400).json({ msg: "사용자를 찾을 수 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "잘못된 비밀번호입니다." });
    }

    const token = jwt.sign({ email: user.email }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.render("chat-info", {
      user: user,
      name: user.name,
      userEmail: user.email,
      friends: user.friends,
      friendCount: user.friends.length,
      userId: user._id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = { createUser, login };
