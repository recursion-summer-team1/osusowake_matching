const pool = require("../../mysqlConnection");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const createUser = (req, res) => {
  const { userName, email, password } = req.body;

  // パスワードのハッシュ化
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("userController: Password hashing error:", err);
      return res.status(500).send("Internal Server error");
    }

    // ハッシュ化したパスワードをデータベースに保存
    pool.query(
      "INSERT INTO User (userName, email, password) VALUES (?, ?, ?)",
      [userName, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("userController: createUser SQL execute error:", err);
          return res.status(500).send("Internal Server error");
        } else {
          res.status(201).send({
            userId: results.insertId,
            userName,
            email,
            token: "rakutenToken",
          });
        }
      },
    );
  });
};

module.exports = createUser;
