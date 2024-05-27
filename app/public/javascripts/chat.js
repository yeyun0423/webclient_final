//경로 /app/public/javascript/chat.js
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
