const pool = require("../../mysqlConnection");

const getChat = (req, res) => {
  const dealId = req.params.dealid;

  if (!dealId) {
    return res.status(400).json({ error: "Missing deal id" });
  }

  pool.query(
    "SELECT * FROM Chat WHERE dealId = ?;",
    [dealId],
    (err, results) => {
      if (err) {
        console.error("chats.js: sql execute error");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Chat not found" });
      }

      console.log("chats.js: sql execute success");
      res.json(results); // 最初の結果のみを返す
    },
  );
};

module.exports = getChat;
