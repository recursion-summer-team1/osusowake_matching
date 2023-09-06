const pool = require("../../mysqlConnection");

const deleteFoodById = (req, res) => {
  const foodId = req.params.foodId;

  // IDのバリデーション
  if (!Number.isInteger(parseInt(foodId))) {
    return res.status(400).send({
      message: "Bad Request",
      error: "Invalid foodId",
    });
  }

  // SQLのDELETEクエリの実行
  pool.query("DELETE FROM Food WHERE foodId = ?", [foodId], (err, results) => {
    if (err) {
      console.error("foods-delete.js: sql execute error", err);
      return res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    // 削除されたレコードが0の場合
    if (results.affectedRows === 0) {
      return res.status(404).send({
        message: "Not Found",
        error: "No food with the specified ID was found.",
      });
    }

    res.status(200).send({
      message: "Food item deleted successfully.",
    });
  });
};

module.exports = deleteFoodById;
