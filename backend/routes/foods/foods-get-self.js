const pool = require("../../mysqlConnection");

const getSelfFood = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  const getSelfFoodQuery = `
      SELECT
        Food.*,
        User.userName,
        User.avatarUrl
      FROM Food
      JOIN User ON Food.userId = User.userId
      AND User.UserId = ?;
    `;
  
  pool.query(getSelfFoodQuery, [userId], (err, results) => {
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

module.exports = getSelfFood;