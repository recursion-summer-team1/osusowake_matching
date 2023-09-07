const pool = require("../../mysqlConnection");
const bcrypt = require("bcryptjs");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  pool.query("SELECT * FROM User WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("user.js: sql execute error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("user.js: password compare error");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!result) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      res.json({
        userId: user.userId,
        userName: user.userName,
        token: "rakutenToken",
      });
    });
  });
};

module.exports = loginUser;
