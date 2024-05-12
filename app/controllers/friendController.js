//경로 app/controllers/friendController.js
const { User } = require("../models/userModel");
const addFriend = async (req, res) => {
  try {
    const userEmail = req.body.userEmail; // 현재 사용자 이메일
    const friendEmail = req.body.friendEmail; // 추가할 친구의 이메일

    // 현재 사용자와 친구 모두를 이메일로 찾음
    const user = await User.findOne({ email: userEmail });
    const friend = await User.findOne({ email: friendEmail });

    // 사용자 또는 친구가 존재하지 않는 경우 처리
    if (!user || !friend) {
      return res.status(404).json({ msg: "사용자가 존재하지 않습니다." });
    }

    // 이미 친구 목록에 있는지 확인
    if (
      user.friends.map((id) => id.toString()).includes(friend._id.toString())
    ) {
      return res.status(400).json({ msg: "이미 친구입니다." });
    }

    // 양쪽 모두에 친구 추가
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.status(200).json({ msg: "친구가 추가되었습니다." });
  } catch (err) {
    console.error("Error adding friend:", err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const userId = req.body.userId; // 현재 사용자 ID
    const friendId = req.body.friendId; // 삭제할 친구의 ID

    // 현재 사용자와 친구 모두를 찾음
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    // 친구 목록에서 제거
    user.friends.pull(friendId);
    friend.friends.pull(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ msg: "친구가 삭제되었습니다." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 오류" });
  }
};

module.exports = { addFriend, removeFriend };
