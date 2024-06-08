const express = require("express");
const app = express();
let path = require("path");

const router = require("./routes/routes");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const friendRouter = require("./routes/friend");
const chatRouter = require("./routes/chat");

const mongoDB = require("./mongoConnection");

mongoDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(router);
app.use(loginRouter);
app.use(signupRouter);
app.use(friendRouter);
app.use(chatRouter);

module.exports = app;
