//경로 app/public/javascripts/room.js
const path = window.location.pathname;
const pathSegments = path.split("/");
const roomId = pathSegments[pathSegments.length - 1];

$(document).ready(function () {
  loadMessages();
  setInterval(loadMessages, 3000);

  $("#send-button").click(function () {
    sendMessage();
  });
});

var userEmail = $('input[name="userEmail"]').val();

function loadMessages() {
  console.log("loadMessages() 실행");
  $.ajax({
    url: "/getMessage",
    type: "get",
    data: { roomId },
    success: function (result) {
      console.log(result);
      displayMessages(result);
    },
    error: function (err) {
      console.log("loadMessages() 오류:", err);
    },
  });
}
function displayMessages(messages) {
  $("#chat-messages").empty();

  messages.forEach(function (message) {
    const date = new Date(message.time);
    const options = {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      minute: "numeric",
    };
    const koreanTime = date.toLocaleString("ko-KR", options);
    const messageElement = $("<li>").addClass("message");
    const messageContent = $("<p>").text(message.text);
    const messageTime = $("<span>")
      .addClass("message-time")
      .text(koreanTime || "시간 없음");

    if (message.name === userEmail) {
      messageElement.addClass("right");
    } else {
      messageElement.addClass("left");
    }

    messageElement.append(messageContent);
    messageElement.append(messageTime);
    $("#chat-messages").append(messageElement);
  });
}
