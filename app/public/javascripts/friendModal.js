var modal = document.getElementById("addFriendModal");
var btn = document.getElementById("add-friend-button");

btn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
