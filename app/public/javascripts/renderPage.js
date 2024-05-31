//경로 /app/public/javascript/renderPage.js

function loadChatList(userEmail) {
  $.ajax({
    url: "/chatlist",
    type: "GET",
    data: { userEmail },
    success: function (result) {
      $(".renderPage").empty();
      $(".renderPage").html(result);
    },
    error: function (err) {
      console.error("챗 리스트 불러오기 오류:", err);
    },
  });
}

function loadFriendList(userEmail) {
  $.ajax({
    url: "/loadFriendList",
    type: "get",
    data: { userEmail },
    success: function (result) {
      $(".renderPage").empty();
      $(".renderPage").html(result);
    },
    error: function (err) {
      console.error("친구 리스트 불러오기 오류:", err);
    },
  });
}
const userEmail = $("input[name='userEmail']").val();

$(document).ready(function () {
  loadFriendList(userEmail);
});

$("#chat-icon").on("click", function () {
  loadChatList(userEmail);
});
$("#person-icon").on("click", function () {
  loadFriendList(userEmail);
});
function enterChat(chatId) {
  window.location.href = `/chat/${chatId}`;
}
