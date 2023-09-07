const pool = require("../../mysqlConnection");

const deleteChatById = (req, res) => {
  const dealId = req.params.dealid;

  // IDのバリデーション
  if (!Number.isInteger(parseInt(dealId))) {
    return res.status(400).send({
      message: "Bad Request",
      error: "Invalid dealId",
    });
  }

  // SQLのDELETEクエリの実行
  pool.query("DELETE FROM Chat WHERE dealId = ?", [dealId], (err, results) => {
    if (err) {
      console.error("chats-delete.js: sql execute error", err);
      return res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    // 削除されたレコードが0の場合
    if (results.affectedRows === 0) {
      return res.status(404).send({
        message: "Not Found",
        error: "No chat with the specified ID was found.",
      });
    }

    res.status(200).send({
      message: "Chat item deleted successfully.",
    });
  });
};

module.exports = deleteChatById;
