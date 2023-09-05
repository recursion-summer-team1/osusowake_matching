const pool = require("../../mysqlConnection");

const postFood = (req, res) => {
    pool.query("INSERT INTO Food (userId, foodName, foodImageUrl, isSoldout, expirationDate, quantity, unit, description) VALUES (? ? ? ? ? ? ? ?)",
     [req.body.itemName],
     (err, results) => {
      if (err) {
        console.error("foods.js: sql execute error");
      } else {
        console.log("foods.js: sql execute success");
      }
      res.send(results);
    });
  };
  
  module.exports = postFood;
  