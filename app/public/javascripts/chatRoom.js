document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.addEventListener("focus", function () {
      this.style.outline = "none";
    });
  });
  var sendButton = document.getElementById("send-button");
  var chatInput = document.getElementById("chat-input");
  var userEmail = $('input[name="userEmail"]').val();

  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const roomId = pathSegments[pathSegments.length - 1];

  function sendMessage() {
    var messageText = $("#chat-input").val().trim();
    if (messageText) {
      var newMessage = $("<li>").addClass("message right");
      var messageContent = $("<p>").text(messageText);
      newMessage.append(messageContent);

      var messageTime = $("<span>").addClass("message-time");
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
});
