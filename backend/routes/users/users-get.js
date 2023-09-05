const pool = require('../../mysqlConnection');

const getUser = (req, res, next) => {
  pool.query('SELECT * from users;', (err, results, fields) => {
    if (err) {
      console.error("user.js: sql execute error");
    } else {
      console.log("user.js: sql execute success");
    }
    res.send(results);
  });
};

module.exports = getUser;
