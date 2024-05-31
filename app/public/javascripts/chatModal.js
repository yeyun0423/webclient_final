//경로 /app/public/javascript/chatModal.js

// 모달 열기
var modal = document.getElementById("addChatModal");
var btn = document.getElementById("add-chat-button");

btn.onclick = function () {
  modal.style.display = "block";
};

// 모달 닫기
var close = document.getElementsByClassName("close")[0];

close.onclick = function () {
  modal.style.display = "none";
};

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
