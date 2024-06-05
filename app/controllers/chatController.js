// 경로: app/controllers/chatController.js
const { User } = require("../models/userModel");
const { Room } = require("../models/chatModel");

let chatList = async function (req, res) {
  const userEmail = req.query.userEmail;
  try {
    const room = await Room.find({
      participants: { $in: [userEmail] },
    });
    res.render("chat-list", {
      room: room,
      userEmail: userEmail,
    });
  } catch (err) {
    // console.error("사용자 조회 중 오류 발생:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

let createRoom = async function (req, res) {
  const userEmail = req.body.userEmail;
  const friendEmail = req.body.friendEmail;

  const friend = await User.findOne({ email: friendEmail });
  const user = await User.findOne({ email: userEmail });
  try {
    let room = await Room.findOne({
      participants: { $all: [userEmail, friendEmail] },
    });
    const userRooms = await Room.find({
      participants: userEmail,
    });
    const roomName = `${user.name},${friend.name}`;
    if (!friend) {
      return res.status(404).json({ message: "친구를 찾을 수 없음" });
    }
    if (!room) {
      room = new Room({
        participants: [userEmail, friendEmail],
        messages: [],
        roomName: roomName,
      });
      await room.save();
    }
    res.status(200).json({ rooms: userRooms });
  } catch (err) {
    console.error("채팅방 생성 실패:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

const fetchChatRooms = async (req, res) => {
  const userEmail = req.query.userEmail;
  try {
    const userRooms = await Room.find({
      participants: userEmail,
    });
    res.status(200).json({ rooms: userRooms });
  } catch (err) {
    return res.status(500).send("서버 내부 오류");
  }
};

let getMessages = async (req, res) => {
  const roomId = req.query.roomId;

  try {
    let room = await Room.findById(roomId);
    if (room) {
      res.status(201).json(room.messages);
    } else {
      res.status(404).json({ message: "방을 찾을 수 없음" });
    }
  } catch (err) {
    console.error("메시지 가져오기 중 오류 발생:", err);
    res.status(500).send("서버 내부 오류");
  }
};

let postMessage = async (req, res) => {
  const roomId = req.params.id;
  const message = req.body.messageText;
  const user = req.body.userEmail;
  //const timestamp = req.body.timestamp;

  try {
    let room = await Room.findById(roomId);
    if (room) {
      room.messages.push({
        name: user,
        text: message,
        createdAt: new Date(),
      });
      await room.save();
      res.status(201).json({ message: "메시지가 저장됨" });
    } else {
      res.status(404).json({ message: "방을 찾을 수 없음" });
    }
  } catch (err) {
    console.error("메시지 저장 중 오류 발생:", err);
    res.status(500).send("서버 내부 오류");
  }
};

let enterRoom = async (req, res) => {
  const userEmail = req.query.userEmail;
  const roomId = req.params._id;
  const room = await Room.findById(roomId);

  res.render("chatRoom", { userEmail: userEmail, roomName: room.roomName });
};

module.exports = {
  getMessages,
  postMessage,
  chatList,
  createRoom,
  enterRoom,
  fetchChatRooms,
};
