const pool = require("../../mysqlConnection");

const getFood = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  // friend_list取得
  const friendListQuery = `
    SELECT f1.followeeId AS userId
    FROM FriendShip AS f1
    JOIN FriendShip AS f2 ON f1.followerId = f2.followeeId AND f1.followeeId = f2.followerId
    WHERE f1.followerId = ?;
  `;

  pool.query(friendListQuery, [userId], (error, friendListResults) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }

    // friend_list内の友達のuserIdを取得
    const friendUserIds = friendListResults.map((friend) => friend.userId);

    if (friendUserIds.length === 0) {
      return res.status(400).json({ error: "No friends found" });
    }

    // 友達のuserIdと一致するFoodデータを取得
    const getFriendFoodQuery = `
      SELECT
        Food.foodId,
        Food.foodName,
        Food.foodImageUrl,
        User.UserId,
        User.userName
      FROM Food
      JOIN User ON Food.userId = User.userId
      WHERE Food.isSoldOut = false
      AND User.UserId IN (?);
    `;

    pool.query(getFriendFoodQuery, [friendUserIds], (err, results) => {
      if (err) {
        console.error("user.js: sql execute error");
        return res.status(500).send({
          message: "Internal Server Error",
          error: err,
        });
      } else {
        console.log("user.js: sql execute success");
      }
      res.send(results);
    });
  });
};

module.exports = getFood;
