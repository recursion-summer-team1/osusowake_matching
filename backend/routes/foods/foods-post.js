const pool = require("../../mysqlConnection");

const postFood = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (
    req.body.expirationDate === null ||
    req.body.quantity === null ||
    req.body.unit === null ||
    req.body.description === null
  ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "expirationDate or quantity cannot be null",
    });
  }
  pool.query(
    "INSERT INTO Food (userId, foodName, foodImageUrl, isSoldout, expirationDate, quantity, unit, description) VALUES (?,?,?,?,?,?,?,?)",
    [
      req.body.userId,
      req.body.foodName,
      req.body.foodImageUrl,
      req.body.isSoldout,
      req.body.expirationDate,
      req.body.quantity,
      req.body.unit,
      req.body.description,
    ],
    (err, results) => {
      if (err) {
        console.error("foods.js: sql execute error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
      console.log("foods.js: sql execute success");
      res.send(results);
    },
  );
};

module.exports = postFood;
