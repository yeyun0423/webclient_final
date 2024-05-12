//경로 app/socket.js
const socketIo = require("socket.io");

function initSocket(server) {
  const io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("새로운 클라이언트가 연결되었습니다.");

    socket.on("disconnect", () => {
      console.log("클라이언트가 연결을 끊었습니다.");
    });
  });
}

module.exports = initSocket;
