var express = require("express");
var router = express.Router();

const getUser = require("./users-get");
const crateUser = require("./users-post");

/* GET users listing. */
router.get("/:id", getUser);

router.post("/signup", crateUser);

module.exports = router;
