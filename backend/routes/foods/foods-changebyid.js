const pool = require("../../mysqlConnection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storagePath = path.join(process.cwd(), ".data/images/foods");

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

const changeFoodById = (req, res) => {
  const foodId = req.params.foodId;

  // 必須のフィールドがnullであるかどうかをチェック
  if (
    !req.body.userId ||
    !req.body.foodName ||
    !req.body.quantity ||
    !req.body.unit ||
    !req.body.expirationDate
  ) {
    return res.status(400).send({
      message: "Bad Request",
      error: "request parameters cannot be null",
    });
  }

  const userId = parseInt(req.body.userId);
  const quantity = parseFloat(req.body.quantity);
  const isSoldOut = req.body.isSoldOut === "true";

  if (isNaN(userId) || isNaN(quantity)) {
    return res.status(400).send({
      message: "Bad Request",
      error: "userId or quantity is not a number",
    });
  }

  // 既定の更新カラムと値
  const updateColumns = [
    "userId=?",
    "foodName=?",
    "isSoldOut=?",
    "expirationDate=?",
    "quantity=?",
    "unit=?",
    "description=?",
  ];
  const updateValues = [
    userId,
    req.body.foodName,
    isSoldOut,
    req.body.expirationDate,
    quantity,
    req.body.unit,
    req.body.description,
  ];

  // 画像がアップロードされている場合のみ、更新カラムと値を追加
  if (req.file) {
    updateColumns.push("foodImageUrl=?");
    updateValues.push(req.file.path);
  }

  updateValues.push(foodId);

  pool.query(
    `UPDATE Food SET ${updateColumns.join(", ")} WHERE foodId=?`,
    updateValues,
    (err, results) => {
      if (err) {
        console.error("foods-put.js: sql execute error", err);
        return res.status(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }

      // 更新されたレコードが0の場合
      if (results.affectedRows === 0) {
        return res.status(404).send({
          message: "Not Found",
          error: "No food with the specified ID was found.",
        });
      }

      res.status(200).send({
        message: "Food item updated successfully.",
      });
    },
  );
};

module.exports = {
  changeFoodById: [upload.single("foodImage"), changeFoodById], // 画像アップロード用のmiddlewareを追加
};
