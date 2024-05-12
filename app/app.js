//경로 /app/app.js
const express = require("express");
const app = express();
let path = require("path");
const cors = require("cors");

const router = require("./routes/routes");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const friendRouter = require("./routes/friend");

const mongoDB = require("./mongoConnection");

// mongoDB
mongoDB();

// 뷰 엔진 설정

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 미들웨어를 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, "public")));

//cors 초기화
app.use(cors());

// 라우트 설정
app.use(router);
app.use(loginRouter);
app.use(signupRouter);
app.use(friendRouter);

module.exports = app;
