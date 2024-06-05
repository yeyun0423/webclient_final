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

  $("#chat-input").keypress(function (e) {
    if (e.which === 13) {
      // 엔터 키를 누를 때
      sendMessage();
    }
  });
});

var userEmail = $('input[name="userEmail"]').val();

function loadMessages() {
  console.log("loadMessages 실행");
  $.ajax({
    url: "/getMessage",
    type: "get",
    data: { roomId },
    success: function (result) {
      displayMessages(result);
    },
    error: function (err) {
      console.log("불러오기 오류:", err);
    },
  });
}
function displayMessages(messages) {
  $("#chat-messages").empty();

  messages.forEach(function (message) {
    const messageElement = $("<li>").addClass("message");
    const messageContent = $("<p>").text(message.text);
    const messageTime = $("<span>")
      .addClass("message-time")
      .text(message.timestamp || "시간 없음");

    if (message.name === userEmail) {
      messageElement.addClass("right");
    } else {
      messageElement.addClass("left");
    }

    messageElement.append(messageContent);
    messageElement.append(messageTime); // 시간 요소 추가
    $("#chat-messages").append(messageElement);
  });
}
