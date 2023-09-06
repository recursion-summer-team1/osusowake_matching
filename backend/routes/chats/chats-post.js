const pool = require("../../mysqlConnection");

const postChat = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (
    req.body.dealId === null ||
    req.body.senderId === null ||
    req.body.content === null
  ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "dealId, senderId, cannot be null",
    });
  }

  pool.query(
    "INSERT INTO Chat (dealId, senderId, content) VALUES (?,?,?)",
    [req.body.dealId, req.body.senderId, req.body.content],
    (err, results) => {
      if (err) {
        console.error("chats.js: sql execute error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
      console.log("chats.js: sql execute success");
      res.send(results);
    },
  );
};

module.exports = postChat;
