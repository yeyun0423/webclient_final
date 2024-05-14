//경로 app/controllers/friendController.js
const { User } = require("../models/userModel");

const addFriend = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const friendEmail = req.body.friendEmail;

    const user = await User.findOne({ email: userEmail }).populate("friends");
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      return res.status(404).json({ msg: "사용자가 존재하지 않습니다." });
    }

    if (
      user.friends.map((id) => id.toString()).includes(friend._id.toString())
    ) {
      return res.status(400).json({ msg: "이미 친구입니다." });
    }

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();
    console.log(user);
    res.render("chat-info", {
      name: user.name,
      userEmail: user.email,
      friends: user.friends,
    });
  } catch (err) {
    console.error("친구 추가 중 오류 발생:", err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const userEmail = req.user.email; // 예시로 사용자 ID를 인증 메커니즘을 통해 얻어옴
    const friendEmail = req.params.friendEmail; // 경로 변수를 통해 friendEmail를 얻어옴

    // 현재 사용자와 친구 모두를 찾음
    const user = await User.findById(userEmail);
    const friend = await User.findById(friendEmail);

    if (!user || !friend) {
      return res
        .status(404)
        .json({ msg: "사용자 또는 친구를 찾을 수 없습니다." });
    }

    // 친구 목록에서 제거
    user.friends.pull(friendEmail);
    friend.friends.pull(userEmail);

    await user.save();
    await friend.save();

    res.status(200).json({ msg: "친구가 삭제되었습니다." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = { addFriend, removeFriend };
