var express = require("express");
var router = express.Router();

const postFood = require("./foods-post");
const getFood = require("./foods-get");

/* POST users listing. */
router.post("/", postFood);
router.get("/", getFood);

module.exports = router;
