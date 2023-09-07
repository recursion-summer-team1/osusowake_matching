const pool = require("../../mysqlConnection");

const postFriendship = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (req.body.followeeId === null || req.body.followerId === null) {
    return res.status(400).send({
      message: "Bad Request",
      error: "followeeId or followerId cannot be null",
    });
  }

  // 重複チェック
  const checkDuplicateQuery =
    "SELECT * FROM FriendShip WHERE followeeId = ? AND followerId = ?";
  pool.query(
    checkDuplicateQuery,
    [req.body.followeeId, req.body.followerId],
    (err, results) => {
      if (err) {
        console.error("friendships-post.js: duplicate check error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }

      // 重複がある場合
      if (results.length > 0) {
        console.log("friendships-post.js: Duplicate record found");
        return res.status(400).send({ message: "Duplicate record found" });
      }

      // データの挿入
      const insertQuery =
        "INSERT INTO FriendShip (followeeId, followerId) VALUES (?, ?)";
      pool.query(
        insertQuery,
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
    },
  );
};

module.exports = postFriendship;
