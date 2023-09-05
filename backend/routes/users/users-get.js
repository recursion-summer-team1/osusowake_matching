const pool = require("../../mysqlConnection");

const getUser = (req, res) => {
  pool.query("SELECT * from users;", (err, results) => {
    if (err) {
      console.error("user.js: sql execute error");
    } else {
      console.log("user.js: sql execute success");
    }
    res.send(results);
  });
};

module.exports = getUser;
