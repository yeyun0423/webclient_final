//경로 app/controllers/friendController.js
const { User } = require("../models/userModel");

const addFriend = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const friendEmail = req.body.friendEmail;

    const user = await User.findOne({ email: userEmail });
    const friend = await User.findOne({ email: friendEmail });
    if (!user || !friend) {
      return res.status(404).json({ msg: "사용자가 존재하지 않습니다." });
    }

    if (user.friends.some((friend) => friend.email === friendEmail)) {
      return res.status(400).json({ msg: "이미 친구입니다." });
    }
    user.friends.push({ email: friendEmail, name: friend.name });
    friend.friends.push({ email: userEmail, name: user.name });

    await user.save();
    await friend.save();
    res.json({
      user,
    });
  } catch (err) {
    console.error("친구 추가 중 오류 발생:", err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const friendEmail = req.params.friendEmail;

    const user = await User.findOne({ email: userEmail });

    const friend = await User.findOne({ email: friendEmail });
    if (!user && !friend) {
      return res
        .status(404)
        .json({ msg: "사용자와 친구 모두를 찾을 수 없습니다." });
    } else if (!user) {
      return res.status(404).json({ msg: "사용자를 찾을 수 없습니다." });
    } else if (!friend) {
      return res.status(404).json({ msg: "친구를 찾을 수 없습니다." });
    }

    user.friends = user.friends.filter((f) => f.email !== friend.email);
    friend.friends = friend.friends.filter((f) => f.email !== user.email);

    await user.save();
    await friend.save();

    res.status(200).json({ msg: "친구가 삭제되었습니다." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류 발생" });
  }
};

let loadFriendList = async function (req, res) {
  const userEmail = req.query.userEmail;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다");
    }

    res.render("friend-list", {
      user: user,
      name: user.name,
      userEmail: user.email,
      friends: user.friends,
      friendCount: user.friends.length,
      userId: user._id,
    });
  } catch (err) {
    console.error("사용자 조회 중 오류 발생:", err);
    return res.status(500).send("서버 내부 오류");
  }
};

const loadFriends = async (req, res) => {};

module.exports = { addFriend, removeFriend, loadFriendList };
