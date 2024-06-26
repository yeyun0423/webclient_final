const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
