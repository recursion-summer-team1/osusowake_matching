const pool = require("../../mysqlConnection");

const postDeal = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (
    req.body.requesterId === null ||
    req.body.foodId === null ||
    req.body.isComplete === null
  ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "requesterId or foodId or isComplete cannot be null",
    });
  }
  pool.query(
    "INSERT INTO Deal (requesterId, foodId, isComplete) VALUES (?,?,?)",
    [req.body.requesterId, req.body.foodId, req.body.isComplete],
    (err, results) => {
      if (err) {
        console.error("deals-post.js: sql execute error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
      console.log("deals-post.js: sql execute success");
      res.send(results);
    },
  );
};

module.exports = postDeal;
