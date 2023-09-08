const pool = require("../../mysqlConnection");

const getMutualFollowers = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  // 特定のユーザーIDを持つユーザーと相互にフォローしあっているフォロワーのIDと名前を取得するSQLクエリ
  const sqlQuery = `
    SELECT f1.followeeId AS userId, u.userName, u.avatarUrl
    FROM FriendShip AS f1
    JOIN FriendShip AS f2 ON f1.followerId = f2.followeeId AND f1.followeeId = f2.followerId
    JOIN User AS u ON f1.followeeId = u.userId
    WHERE f1.followerId = ?;
  `;

  pool.query(sqlQuery, [userId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Database error", details: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // 結果をJSONレスポンスとして返す
    const mutualFollowers = results.map((row) => ({
      userId: row.userId,
      userName: row.userName,
      avatarUrl: row.avatarUrl,
    }));

    res.status(200).json({ mutualFollowers });
  });
};

module.exports = getMutualFollowers;
