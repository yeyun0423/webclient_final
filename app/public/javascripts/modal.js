//경로 /app/public/javascript/modal.js

// 모달 열기
var modal = document.getElementById("addFriendModal");
var btn = document.getElementById("add-friend-button");

btn.onclick = function () {
  modal.style.display = "block";
};

// 모달 닫기
var close = document.getElementsByClassName("close")[0];

close.onclick = function () {
  modal.style.display = "none";
};

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//친구 제거되었음을 알리는 알림창
document.addEventListener("DOMContentLoaded", function () {
  const removeIcons = document.querySelectorAll(".remove-friend-icon");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const isConfirmed = confirm("친구를 삭제하시겠습니까?");
      if (isConfirmed) {
        // 여기에 친구를 삭제하는 로직을 추가하세요.
        alert("친구가 삭제되었습니다");
      }
    });
  });
});
