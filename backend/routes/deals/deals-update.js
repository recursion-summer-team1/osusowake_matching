const pool = require("../../mysqlConnection");

const updateDealbyfoodId = (req, res) => {
  const foodId = req.params.foodId;
  // IDのバリデーション
  if (!Number.isInteger(parseInt(foodId))) {
    return res.status(400).send({
      message: "Bad Request",
      error: "Invalid foodId",
    });
  }

  // SQLのUPDATEクエリの実行
  pool.query(
    //DealテーブルのisCompleteをfoodIdに合致するものをすべてtrueに変更
    "UPDATE Deal SET isComplete=? WHERE foodId=?",
    [true, foodId],
    (err, results) => {
      if (err) {
        console.error("deals-update.js: sql execute error", err);
        return res.status(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }

      // 更新されたレコードが0の場合
      if (results.affectedRows === 0) {
        return res.status(404).send({
          message: "Not Found",
          error: "No deal with the specified ID was found.",
        });
      }

      res.status(200).send({
        message: "Deal item updated successfully.",
      });
    },
  );

  //SQLのUPDATEクエリの実行2つめ
  pool.query(
    //foodテーブルのisSoldOutをfoodIdに合致するものをすべてtrueに変更
    "UPDATE Food SET isSoldOut=? WHERE foodId=?",
    [true, foodId],
    (err, results) => {
      if (err) {
        console.error("deals-update.js: sql execute error", err);
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

module.exports = updateDealbyfoodId;
