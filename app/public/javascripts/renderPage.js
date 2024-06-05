//경로 /app/public/javascript/renderPage.js
const userEmail = $("input[name='userEmail']").val();

function loadChatList() {
  $.ajax({
    url: "/chatlist",
    type: "GET",
    data: { userEmail: userEmail },
    success: function (result) {
      $(".renderPage").empty();
      $(".renderPage").html(result);
      fetchChatRooms();
    },
    error: function (err) {
      console.error("챗 리스트 불러오기 오류:", err);
    },
  });
}

function loadFriendList() {
  $.ajax({
    url: "/loadFriendList",
    type: "get",
    data: { userEmail: userEmail },
    success: function (result) {
      $(".renderPage").empty();
      $(".renderPage").html(result);
    },
    error: function (err) {
      console.error("친구 리스트 불러오기 오류:", err);
    },
  });
}

$(document).ready(function () {
  loadFriendList();
});

$("#chat-icon").on("click", function () {
  loadChatList();
});
$("#person-icon").on("click", function () {
  loadFriendList();
});

let roomId;

function enterChat(chatId, userEmail) {
  roomId = chatId;
  window.location.href = `/chat/${roomId}?userEmail=${encodeURIComponent(
    userEmail
  )}`;
}
