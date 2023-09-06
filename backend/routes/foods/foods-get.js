const pool = require("../../mysqlConnection");

const getFood = (req, res) => {
  const sql = `
  SELECT
    Food.foodName,
    Food.foodImageUrl,
    User.UserId,
    User.userName
  FROM Food
  JOIN User ON Food.userId = User.userId
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("user.js: sql execute error");
      return res.status(500).send({
        message: "Internal Server Error",
        error: err,
      });
    } else {
      console.log("user.js: sql execute success");
    }
    res.send(results);
  });
};

module.exports = getFood;
