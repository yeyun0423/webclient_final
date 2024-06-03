//경로 /app/public/javascript/friend.js
//친구 추가
$("#modal-friend-button").click(function () {
  var friendEmail = $('input[name="friendEmail"]').val();
  var userEmail = $('input[name="userEmail"]').val();

  $.ajax({
    url: "/add",
    type: "post",
    data: {
      friendEmail: friendEmail,
      userEmail: userEmail,

    },

    success: function (response) {

      $("#friends-list").empty(); 
      response.user.friends.forEach(function (friend) {

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

//친구 삭제
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
