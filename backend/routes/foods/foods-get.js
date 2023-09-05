const pool = require("../../mysqlConnection");

const getFood = (req, res) => {
  pool.query("SELECT * from Food;", (err, results) => {
    if (err) {
      console.error("user.js: sql execute error");
    } else {
      console.log("user.js: sql execute success");
    }
    res.send(results);
  });
};

module.exports = getFood;
