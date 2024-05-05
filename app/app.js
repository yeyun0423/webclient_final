//경로 ./app/app.js
const express = require("express");
const app = express();
let path = require("path");

const main = require("./routes/index");

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
app.use("/", main);

module.exports = app;
