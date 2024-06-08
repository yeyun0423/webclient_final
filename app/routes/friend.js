const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.post("/addFriend", friendController.addFriend);
router.delete("/remove/:friendEmail", friendController.removeFriend);
router.get("/loadFriendList", friendController.loadFriendList);
router.get("/loadFriends", friendController.loadFriendList);
module.exports = router;
