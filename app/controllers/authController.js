//경로 ./app/controllers/authControllers
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

auth = async (req, res) => {
  try {
    // 요청에서 이메일과 비밀번호 추출
    const { email, password } = req.body;

    // 이메일로 사용자를 찾음
    const user = await User.findOne({ email });
    if (!user) {
      // 사용자가 존재하지 않는 경우
      return res.status(400).json({ msg: "존재하지 않는 사용자입니다." });
    }

    // 비밀번호 일치 여부 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // 비밀번호가 일치하지 않는 경우
      return res.status(400).json({ msg: "잘못된 비밀번호입니다." });
    }

    // 로그인 성공 응답
    res.json({ msg: "로그인 성공" });
  } catch (err) {
    // 오류 처리
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = auth;
