var express = require("express");
var router = express.Router();

const postFriendship = require("./friendships-post");
const getFriendship = require("./friendships-get");
const deleteFriendship = require("./friendships-delete");

router.post("/", postFriendship);
router.get("/", getFriendship);
router.get("/", deleteFriendship);

module.exports = router;
