//경로 /app/public/javascript/friendAdd.js
$("#modal-add-button").click(function () {
  var friendEmail = $('input[name="friendEmail"]').val();
  var userEmail = $('input[name="userEmail"]').val();
  $.ajax({
    url: "/add",
    type: "POST",
    data: {
      friendEmail: friendEmail,
      userEmail: userEmail,
    },

    success: function (response) {
      // 친구 목록을 동적으로 업데이트합니다.
      $("#friends-list").empty(); // 기존 목록을 비웁니다.
      response.user.friends.forEach(function (friend) {
        // 친구 목록에 새로운 항목을 추가합니다.
        $("#friends-list").append(`<li class="friend-item">
              <div class="friend-info">
                <img src="/images/friend-photo.png" alt="친구 사진" class="friend-photo" />
                <div class="friend-name-status">
                  <div class="friend-name">${friend.name}</div>
                  <div class="friend-status">상태메세지</div>
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
