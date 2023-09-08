const pool = require("../../mysqlConnection");

const getFoodById = (req, res) => {
  // リクエストからIDを取得
  const foodId = req.params.foodId;

  // IDのバリデーション
  if (!Number.isInteger(parseInt(foodId))) {
    return res.status(400).send({
      message: "Bad Request",
      error: "Invalid foodId",
    });
  }

  const query = `
    SELECT 
      Food.*,
      User.userName,
      User.avatarUrl
    FROM
      Food
    JOIN
      User ON Food.userId = User.userId
    WHERE
      Food.foodId = ?`;

  // SQLクエリの実行
  pool.query(query, [foodId], (err, results) => {
    if (err) {
      console.error("foods-getbyId.js: sql execute error:", err);
      return res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    // 該当するデータが見つからない場合
    if (results.length === 0) {
      return res.status(404).send({
        message: "Not Found",
        error: "No food with the specified foodId exists",
      });
    }

    // データをレスポンスとして返す
    res.send(results[0]);
  });
};

module.exports = getFoodById;
