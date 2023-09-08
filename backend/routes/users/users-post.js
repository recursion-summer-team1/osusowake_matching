const pool = require("../../mysqlConnection");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const saltRounds = 10;

const storagePath = path.join(process.cwd(), ".data/images/avatars");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const createUser = (req, res) => {
  if (!req.body.userName || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Bad Request",
      error: "userName, email and password are required",
    });
  }
  const { userName, email, password } = req.body;

  // パスワードのハッシュ化
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("userController: Password hashing error:", err);
      return res.status(500).send("Internal Server error");
    }

    const fileName = req.file ? path.basename(req.file.path) : null;

    // ハッシュ化したパスワードをデータベースに保存
    pool.query(
      "INSERT INTO User (userName, avatarUrl, email, password) VALUES (?, ?, ?, ?)",
      [userName, fileName, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("userController: createUser SQL execute error:", err);
          return res.status(500).send("Internal Server error");
        } else {
          res.status(201).send({
            userId: results.insertId,
            avatarUrl: fileName,
            userName,
            email,
            token: "rakutenToken",
          });
        }
      },
    );
  });
};

module.exports = {
  createUser: [upload.single("avatar"), createUser],
};
