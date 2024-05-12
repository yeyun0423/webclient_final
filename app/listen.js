// 경로 ./app/listen.js
const http = require("http");
const app = require("./app");
const initSocket = require("./socket");

const port = 3000;

const server = http.createServer(app);
initSocket(server); // Socket.IO 인스턴스를 서버에 연결합니다.

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
