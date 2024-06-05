//경로 /app/public/javascript/chatRoom.js
document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.addEventListener("focus", function () {
      this.style.outline = "none";
    });
  });
  var sendButton = document.getElementById("send-button");
  var chatInput = document.getElementById("chat-input");
  var chatMessages = document.getElementById("chat-messages");
  var userEmail = $('input[name="userEmail"]').val();

  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const roomId = pathSegments[pathSegments.length - 1];

  function sendMessage() {
    var messageText = $("#chat-input").val().trim();
    if (messageText) {
      var newMessage = $("<li>").addClass("message right");
      var messageContent = $("<p>").text(messageText); // 메시지 텍스트를 p 요소로 만듭니다.
      newMessage.append(messageContent); // 메시지 텍스트를 메시지 요소에 추가합니다.

      var currentTime = new Date();
      var hours = currentTime.getHours().toString().padStart(2, "0");
      var minutes = currentTime.getMinutes().toString().padStart(2, "0");
      var formattedTime = hours + ":" + minutes;

      var messageTime = $("<span>")
        .addClass("message-time")
        .text(formattedTime);
      newMessage.append(messageTime);

      $("#chat-messages").append(newMessage);
      $("#chat-input").val("");
      $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);

      $.ajax({
        url: `/sendMessage/${roomId}`,
        type: "post",
        data: {
          messageText,
          userEmail,
        },
        success: function (response) {
          console.log("전송 성공");
        },
        error: function (xhr, status, error) {
          console.error("전송 실패:", error);
        },
      });
    }
  }

  sendButton.addEventListener("click", function () {
    sendMessage();
  });

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
      e.preventDefault();
    }
  });
});
