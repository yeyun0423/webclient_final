#채팅 웹 프로젝트
이 프로젝트는 학교의 웹 클라이언트 수업에서 개인 프로젝트로 진행한 채팅 웹 애플리케이션입니다. 프론트엔드 구현이 주요 목표였지만, Node.js로 서버를 구축하고 MongoDB를 사용하여 데이터베이스를 구현하였습니다.
소개
이 프로젝트는 사용자들이 실시간으로 메시지를 주고받을 수 있는 채팅 웹 애플리케이션입니다. 사용자는 회원가입 및 로그인 후 친구를 추가하고, 친구와 1:1 채팅을 할 수 있습니다.
기능
회원가입 및 로그인: 사용자는 이메일과 비밀번호로 회원가입 및 로그인할 수 있습니다.
친구 추가: 사용자는 다른 사용자를 친구로 추가할 수 있습니다.
실시간 채팅: 사용자는 친구와 실시간으로 메시지를 주고받을 수 있습니다.
메시지 저장: 채팅 메시지는 MongoDB에 저장됩니다.

사용된 기술
프론트엔드: HTML, CSS, JavaScript
백엔드: Node.js, Express
데이터베이스: MongoDB

프로젝트 폴더구조
project-root/
│
├── app.js
├── package.json
├── routes/
│   ├── index.js
│   ├── users.js
│   └── chat.js
├── views/
│   ├── signup.ejs
│   ├── login.ejs
│   ├── friendlist.ejs
│   ├── chatroom.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   ├── css/
│   │   ├── styles.css
│   └── js/
│       ├── main.js
├── models/
│   ├── user.js
│   ├── friend.js
│   └── chat.js
└── config/
    ├── database.js

