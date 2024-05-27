// 경로: app/models/chatModel.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };
