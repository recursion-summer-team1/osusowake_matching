const pool = require("../../mysqlConnection");

const getFriendShip = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  // 特定のユーザーIDを持つユーザーと相互にフォローしあっているフォロワーのIDを取得するSQLクエリ
  const sqlQuery = `
    SELECT f1.followeeId AS userId
    FROM FriendShip AS f1
    JOIN FriendShip AS f2 ON f1.followerId = f2.followeeId AND f1.followeeId = f2.followerId
    WHERE f1.followerId = ?;
  `;

  pool.query(sqlQuery, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }

    // 結果をJSONレスポンスとして返す
    const mutualFollowers = results.map((row) => row.userId);
    res.status(200).json({ mutualFollowers });
  });
};

module.exports = getFriendShip;
