// 경로: app/controllers/chatController.js
const { User } = require("../models/userModel");
const { Chat } = require("../models/chatModel");

let messages = [];

let chatList = async function (req, res) {
  const userEmail = req.query.userEmail;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다");
    }

    const chats = await Chat.find({ participants: userEmail });
    res.render("chat-list", {
      userEmail,
      chats,
      chatCount: chats.length,
    });
  } catch (err) {
    console.error("사용자 조회 중 오류 발생:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

let createChat = async function (req, res) {
  const { userEmail, friendEmail } = req.body;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userEmail, friendEmail] },
    });

    if (!chat) {
      chat = new Chat({ participants: [userEmail, friendEmail] });
      await chat.save();
    }

    res.status(201).json(chat);
  } catch (err) {
    console.error("채팅방 생성 중 오류 발생:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

let getMessages = (req, res) => {
  res.json(messages);
};

let postMessage = (req, res) => {
  const { user, message } = req.body;
  messages.push({ user, message, timestamp: new Date() });
  res.status(201).json({ message: "Message received" });
};

module.exports = { getMessages, postMessage, chatList, createChat };
