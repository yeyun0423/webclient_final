var modal = document.getElementById("addChatModal");
var btn = document.getElementById("add-chat-button");

btn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
