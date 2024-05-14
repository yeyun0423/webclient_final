//경로 /app/public/javascript/friendRemove.js
$(document).ready(function () {
  // 친구 삭제 아이콘에 클릭 이벤트 리스너 추가
  $(".friends-list").on("click", ".remove-friend-icon", function () {
    // 클릭된 아이콘의 부모 요소인 li 태그를 찾아 삭제합니다.
    var friendItem = $(this).closest(".friend-item");
    var friendEmail = $(this).data("email"); // 삭제할 친구의 ID를 가져옵니다.

    // 여기에 서버에 삭제 요청을 보내는 코드를 추가합니다.
    $.ajax({
      url: "/friends/remove/" + friendEmail,
      type: "DELETE",
      success: function (result) {
        friendItem.remove();
      },
      error: function (err) {
        // 오류 처리
        console.error("친구 삭제 오류:", err);
        // 사용자에게 오류 메시지를 보여주는 등의 처리를 할 수 있습니다.
      },
    });
  });
});
//친구 제거되었음을 알리는 알림창
document.addEventListener("DOMContentLoaded", function () {
  const removeIcons = document.querySelectorAll(".remove-friend-icon");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const isConfirmed = confirm("친구를 삭제하시겠습니까?");
      if (isConfirmed) {
        alert("친구가 삭제되었습니다");
      }
    });
  });
});
