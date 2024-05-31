 //경로 /app/public/javascript/Chat.js

//채팅방 추가
$("#modal-chat-button").click(function () {
    console.log("friendEmail,userEmail");
    var friendEmail = $('input[name="friendEmail"]').val();
    var userEmail = $('input[name="userEmail"]').val();
  
    $.ajax({
      url: "/chatAdd",
      type: "get",
      data: {
        friendEmail: friendEmail,
        userEmail: userEmail,
      },
  
      success: function (response) {
        // 친구 목록을 동적으로 업데이트합니다.
        $("#chat-list").empty(); // 기존 목록을 비웁니다.
        response.user.friends.forEach(function (friend) {
          // 친구 목록에 새로운 항목을 추가합니다.
          $("#chat-list").append(`<li class="chat-item">
                <div class="chat-info">
                  <img src="/images/friend-photo.png" alt="친구 사진" class="friend-photo" />
                  <div class="friend-name-status">
                    <div class="friend-name">${friend.name}</div>
                  </div>
                  <img src="/images/remove-friend-icon.png" alt="친구 삭제" class="remove-friend-icon" data-id="${friend._id}" />
                </div>
              </li>`);
        });
        $(".friend-count").text(`친구 ${response.user.friends.length} 명`);
      },
      error: function (xhr, status, error) {
        console.error("친구 추가 실패:", error);
      },
    });
  });
  
  //채팅방 삭제
  $(document).ready(function () {
    $(".friends-list").on("click", ".remove-friend-icon", function () {
      var friendItem = $(this).closest(".friend-item");
      var friendEmail = $(this).data("email");
      var userEmail = $('input[name="userEmail"]').val();
  
      if (confirm("친구를 삭제하시겠습니까?")) {
        $.ajax({
          url: "/remove/" + friendEmail,
          type: "DELETE",
          data: { userEmail: userEmail },
          success: function (result) {
            friendItem.remove();
            var friendCount = $(".friend-item").length;
            $(".friend-count").text(`친구 ${friendCount} 명`);
          },
          error: function (err) {
            console.error("친구 삭제 오류:", err);
          },
        });
      }
    });
  });
  