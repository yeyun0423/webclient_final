// 경로 ./app/listen.js
const http = require("http");
const app = require("./app");

const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
