// //경로 app/middlewares/authenticateToken.js
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const jwtSecret = process.env.JWT_SECRET;

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token; // 쿠키에서 토큰 가져오기
//   if (token == null) return res.sendStatus(401); // 토큰이 없으면 401(Unauthorized)

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) return res.sendStatus(403); // 토큰이 유효하지 않으면 403(Forbidden)
//     req.user = user; // 토큰이 유효하면 요청 객체에 사용자 정보 추가
//     next(); // 다음 미들웨어로 진행
//   });
// };

// module.exports = authenticateToken;
