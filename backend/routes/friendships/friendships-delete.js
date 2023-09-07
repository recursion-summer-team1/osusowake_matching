const pool = require("../../mysqlConnection");

const deleteFriendShip = (req, res) => {
  const followerId = req.body.followerId;
  const followeeId = req.body.followeeId;

  if (!followerId) {
    return res.status(400).json({ error: "Missing followerId" });
  }
  if (!followeeId) {
    return res.status(400).json({ error: "Missing followeeId" });
  }

  const deleteQuery = `
    DELETE FROM FriendShip
    WHERE followerId = ? AND followeeId = ?;
  `;

  pool.query(deleteQuery, [followerId, followeeId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "database error" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "該当するレコードが見つかりませんでした" });
    }

    console.log("friendships.js: sql execute success");
    res.status(200).json({
      message: `Friendship of follower ${followerId} and followee ${followeeId} deleted successfully`,
    });
  });
};

module.exports = deleteFriendShip;
