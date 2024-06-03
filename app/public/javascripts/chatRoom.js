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
    var messageText = chatInput.value.trim();
    if (messageText) {
      var newMessage = document.createElement("li");
      newMessage.classList.add("message");
      newMessage.textContent = messageText;
      chatMessages.appendChild(newMessage);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

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
      error: function (xhr, status, error) {},
    });
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
