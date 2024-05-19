//경로 /app/public/javascript/friendRemove.js
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
