const pool = require("../../mysqlConnection");

const getDealbyOwner = (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  pool.query(
    "SELECT Deal.* FROM Deal INNER JOIN Food ON Deal.foodId = Food.foodId WHERE Food.userId = ? AND isComplete = FALSE;",
    [userId],
    (err, results) => {
      if (err) {
        console.error("deals-getbyrequester.js: sql execute error");
      } else {
        console.log("deals-getbyrequester.js: sql execute success");
      }
      res.send(results);
    },
  );
};

module.exports = getDealbyOwner;
