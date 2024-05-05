// 경로 ./app/www.js
const app = require("./app");

const port = 3000;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
