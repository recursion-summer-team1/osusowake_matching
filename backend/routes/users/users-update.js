const pool = require("../../mysqlConnection");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { userName, email, password } = req.body;

  if (req.headers.authorization !== "rakutenToken") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!userId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  const updateData = {};
  const queryParams = [];

  let query = "UPDATE User SET ";

  if (userName) {
    query += "userName = ?, ";
    queryParams.push(userName);
    updateData.userName = userName;
  }

  if (req.file) {
    const avatarUrl = path.basename(req.file.path);
    query += "avatarUrl = ?, ";
    queryParams.push(avatarUrl);
    updateData.avatarUrl = avatarUrl;
  }

  if (email) {
    query += "email = ?, ";
    queryParams.push(email);
    updateData.email = email;
  }

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("userController: Password hashing error:", err);
        return res.status(500).send("Internal Server error");
      }
      query += "password = ?, ";
      queryParams.push(hashedPassword);
      updateData.password = hashedPassword;
      executeUpdate(query, queryParams, userId, updateData, res);
    });
  } else {
    executeUpdate(query, queryParams, userId, updateData, res);
  }
};

const executeUpdate = (query, queryParams, userId, updateData, res) => {
  query = query.slice(0, -2) + " WHERE userId = ?;";
  queryParams.push(userId);

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("user.js: sql execute error", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: `User ${userId} updated successfully`, updateData });
  });
};

module.exports = {
  updateUser: [upload.single("avatar"), updateUser],
};
