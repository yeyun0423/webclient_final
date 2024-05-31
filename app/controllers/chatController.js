// 경로: app/controllers/chatController.js
const { User } = require("../models/userModel");
const { Room } = require("../models/chatModel");

let messages = [];

let chatList = async function (req, res) {
  const userEmail = "sdsdds";
  const friendEmail = "sdsadd";

  const participants = [userEmail, friendEmail];
  
  try {
    const user = await User.findOne({ email: userEmail });
  
    //if (!user) {
    //  return res.status(404).send("사용자를 찾을 수 없습니다");
    //}

    const room = await Room.find({
      participants: { $in: [userEmail] },
    });

    
    
    res.render("chat-list", {
      participants,
      messages,
      chats: room,
      userEmail: userEmail, 
    });
  } catch (err) {
    console.error("사용자 조회 중 오류 발생:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

let createRoom = async function (req, res) {
  const { userEmail, friendEmail,roomName,message } = req.body;
  console.log("1");
  
  try {
    let room = await Room.findOne({
      participants: { $all: [userEmail, friendEmail] },
    });

    if (!room) {
      room = new Room({
        participants: [userEmail, friendEmail],
        roomName: roomName,
        messages: message,
      });
      await room.save();
    }

    res.status(201).json("채팅방 생성 성공");
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

module.exports = { getMessages, postMessage, chatList, createRoom };
