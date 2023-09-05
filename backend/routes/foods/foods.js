var express = require("express");
var router = express.Router();

const postFood = require("./foods-post");

/* POST users listing. */
router.post("/", postFood);

module.exports = router;
