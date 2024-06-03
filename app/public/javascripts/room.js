const path = window.location.pathname;
const pathSegments = path.split("/");
const roomId = pathSegments[pathSegments.length - 1];

$(document).ready(function () {
  loadMessages();
  //   setInterval(loadMessages, 5000);
});

function loadMessages() {
  console.log("loadMessages 실행");
  $.ajax({
    url: "/getMessage",
    type: "get",
    data: { roomId },
    success: function (result) {
      console.log(result);
    },
    error: function (err) {
      console.log("불러오기 오류:", err);
    },
  });
}
