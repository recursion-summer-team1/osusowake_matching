const pool = require("../../mysqlConnection");

const postFriendship = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (
    req.body.friendShipId === null ||
    req.body.followeeId === null ||
    req.body.followerId === null
  ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "requesterId or foodId or isComplete cannot be null",
    });
  }
  pool.query(
    "INSERT INTO FriendShip (followeeId, followerId) VALUES (?,?)",
    [req.body.followeeId, req.body.followerId],
    (err, results) => {
      if (err) {
        console.error("friendships-post.js: sql execute error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
      console.log("friendships-post.js: sql execute success");
      res.send(results);
    },
  );
};

module.exports = postFriendship;
