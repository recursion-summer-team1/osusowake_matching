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
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postFood = (req, res) => {
  // 必須のフィールドがnullであるかどうかをチェック
  if ( !req.body.userId || !req.body.foodName ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "userId or foodName cannot be null",
    });
  }
  const userId = parseInt(req.body.userId);
  const quantity = parseFloat(req.body.quantity);
  const isSoldOut = req.body.isSoldOut === 'true';

  const foodImageUrl = req.file ? req.file.path : null;

  if (isNaN(userId) || isNaN(quantity)) {
    return res.status(400).send({
      message: "Bad Request",
      error: "userId or quantity is not a number",
    });
  }

  pool.query(
    "INSERT INTO Food (userId, foodName, foodImageUrl, isSoldOut, expirationDate, quantity, unit, description) VALUES (?,?,?,?,?,?,?,?)",
    [
      userId,
      req.body.foodName,
      foodImageUrl,
      isSoldOut,
      req.body.expirationDate,
      quantity,
      req.body.unit,
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
        quantity: quantity,
        unit: req.body.unit,
        description: req.body.description,
      });
    },
  );
};

module.exports = {
  postFood: [upload.single("foodImage"), postFood]
};
