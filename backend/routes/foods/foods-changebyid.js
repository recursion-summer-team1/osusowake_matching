const pool = require("../../mysqlConnection");

const changeFoodById = (req, res) => {
  const foodId = req.params.foodId;

  // IDのバリデーション
  if (!Number.isInteger(parseInt(foodId))) {
    return res.status(400).send({
      message: "Bad Request",
      error: "Invalid foodId",
    });
  }

  // 更新内容の取得
  const {
    userId,
    foodName,
    foodImageUrl,
    isSoldOut,
    expirationDate,
    quantity,
    unit,
    description,
  } = req.body;

  // SQLのUPDATEクエリの実行
  pool.query(
    "UPDATE Food SET userId=?, foodName=?, foodImageUrl=?, isSoldOut=?, expirationDate=?, quantity=?, unit=?, description=? WHERE foodId=?",
    [
      userId,
      foodName,
      foodImageUrl,
      isSoldOut,
      expirationDate,
      quantity,
      unit,
      description,
      foodId,
    ],
    (err, results) => {
      if (err) {
        console.error("foods-put.js: sql execute error", err);
        return res.status(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }

      // 更新されたレコードが0の場合
      if (results.affectedRows === 0) {
        return res.status(404).send({
          message: "Not Found",
          error: "No food with the specified ID was found.",
        });
      }

      res.status(200).send({
        message: "Food item updated successfully.",
      });
    },
  );
};

module.exports = changeFoodById;
