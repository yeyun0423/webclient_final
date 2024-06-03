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

    if (message.name === userEmail) {
      messageElement.addClass("right");
    } else {
      messageElement.addClass("left");
    }

    messageElement.append(messageContent);
    $("#chat-messages").append(messageElement);
  });
}

function sendMessage() {
  const messageContent = $("#chat-input").val().trim();

  if (messageContent !== "") {
    $.ajax({
      url: "/sendMessage",
      type: "post",
      data: {
        roomId: roomId,
        userEmail: userEmail,
        content: messageContent,
      },
      success: function (response) {
        $("#chat-input").val(""); // 입력 필드를 비웁니다.
        loadMessages(); // 메시지를 다시 불러옵니다.
      },
      error: function (err) {
        console.log("전송 오류:", err);
      },
    });
  }
}
