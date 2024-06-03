 //경로 /app/public/javascript/Chat.js

//채팅방 추가
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
        //친구 목록을 동적으로 업데이트합니다.
        $("#chat-list").empty(); // 기존 목록을 비웁니다.
          //친구 목록에 새로운 항목을 추가합니다.
        $("#chat-list").append(`<h1>테스트</h1>`);
        $(".friend-count").text(`채팅방  명`);
      },
      error: function (xhr, status, error) {
        console.error("채팅방 추가 실패:", error);
      },
    });
  });
  
  //채팅방 삭제
//   $(document).ready(function () {
//     $(".friends-list").on("click", ".remove-friend-icon", function () {
//       var friendItem = $(this).closest(".friend-item");
//       var friendEmail = $(this).data("email");
//       var userEmail = $('input[name="userEmail"]').val();
  
//       if (confirm("친구를 삭제하시겠습니까?")) {
//         $.ajax({
//           url: "/remove/" + friendEmail,
//           type: "DELETE",
//           data: { userEmail: userEmail },
//           success: function (result) {
//             friendItem.remove();
//             var friendCount = $(".friend-item").length;
//             $(".friend-count").text(`친구 ${friendCount} 명`);
//           },
//           error: function (err) {
//             console.error("친구 삭제 오류:", err);
//           },
//         });
//       }
//     });
//   });
  