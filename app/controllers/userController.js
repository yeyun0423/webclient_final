const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    // 요청에서 회원가입 정보 추출
    const { email, password, name } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // MongoDB에 새로운 사용자 생성
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    console.log(
      "새로운 사용자 정보:",
      newUser.email,
      newUser.password,
      newUser.name
    );

    // MongoDB에 새로운 사용자 저장
    await newUser.save();

    // 회원가입 성공 응답
    res.status(201).json({ msg: "회원가입 성공" });
  } catch (err) {
    // 오류 처리
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = createUser;
