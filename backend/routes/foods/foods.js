var express = require("express");
var router = express.Router();

const { postFood } = require("./foods-post");
const getFood = require("./foods-get");
const getFoodById = require("./foods-getbyId");
const deleteFoodById = require("./foods-deletebyid");
const { changeFoodById } = require("./foods-changebyid");

/* POST users listing. */
router.post("/", postFood);
router.get("/:userId", getFood);
router.get("/soro/:foodId", getFoodById);
router.delete("/:foodId", deleteFoodById);
router.put("/:foodId", changeFoodById);

module.exports = router;
