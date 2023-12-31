const pool = require("../../mysqlConnection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storagePath = path.join(process.cwd(), ".data/images/foods");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

// ファイルの保存先とファイル名を指定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postFood = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if (
    !req.body.userId ||
    !req.body.foodName ||
    !req.body.quantity ||
    !req.body.expirationDate
  ) {
    return res.status(400).send({
      message: "Bad Request!",
      error: "request parameters cannot be null",
    });
  }
  const userId = parseInt(req.body.userId);
  const isSoldOut = req.body.isSoldOut === "true";

  const fileName = path.basename(req.file.path);
  const foodImageUrl = req.file ? fileName : null;

  if (isNaN(userId)) {
    return res.status(400).send({
      message: "Bad Request",
      error: "userId is not a number",
    });
  }

  pool.query(
    "INSERT INTO Food (userId, foodName, foodImageUrl, isSoldOut, expirationDate, quantity, description) VALUES (?,?,?,?,?,?,?)",
    [
      userId,
      req.body.foodName,
      foodImageUrl,
      isSoldOut,
      req.body.expirationDate,
      req.body.quantity,
      req.body.description,
    ],
    (err, results) => {
      if (err) {
        console.error("foods.js: sql execute error:", err);
        return res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
      console.log("foods.js: sql execute success");
      res.status(201).send({
        foodId: results.insertId,
        userId: userId,
        foodName: req.body.foodName,
        foodImageUrl: foodImageUrl,
        isSoldOut: isSoldOut,
        expirationDate: req.body.expirationDate,
        quantity: req.body.expirationDate,
        description: req.body.description,
      });
    },
  );
};

module.exports = {
  postFood: [upload.single("foodImage"), postFood],
};
