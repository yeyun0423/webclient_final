const loadChatRooms = (response) => {
  $("#rooms-list").empty();
  $(".chat-count").empty();
  $(".chat-count").append(`
    채팅방 ${response.rooms.length} 개
  `);

  if (response.rooms.length > 0) {
    response.rooms.forEach(function (room) {
      console.log(room.messages);
      const roomId = `${room._id}`;
      console.log(roomId);
      $("#rooms-list").append(`
        <li class="chat">
          <div class="chat-info">
            <span class="chat-name">채팅방: ${room.roomName}</span>
            <span class="chat-participants">참여자: ${room.participants.join(
              ", "
            )}</span>
          </div>
          <button class="enter-chat-button" onclick="enterChat('${roomId}')">입장</button>
        </li>
      `);
    });
  } else {
    $("#rooms-list").append(`<li class="chat">채팅방이 없습니다.</li>`);
  }
};

const fetchChatRooms = () => {
  const userEmail = $('input[name="chatUserEmail"]').val();
  $.ajax({
    url: "/getUserRooms",
    type: "GET",
    data: { userEmail: userEmail },
    success: function (response) {
      loadChatRooms(response);
    },
    error: function (xhr, status, error) {
      console.error("fetchChatRooms 오류", error);
    },
  });
};

$("#modal-chat-button").click(function () {
  var friendEmail = $('input[name="chatFriendEmail"]').val();
  var userEmail = $('input[name="chatUserEmail"]').val();
  $.ajax({
    url: "/chatAdd",
    type: "post",
    data: {
      userEmail,
      friendEmail,
    },
    success: function (response) {
      loadChatRooms(response);
    },
    error: function (xhr, status, error) {
      console.error("채팅방 추가 실패:", error);
    },
  });
});
