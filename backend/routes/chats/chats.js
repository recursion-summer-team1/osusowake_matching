var express = require("express");
var router = express.Router();

const postChat = require("./chats-post");
const getChat = require("./chats-get");
const deleteChatById = require("./chats-deletebyid");

/* POST chat */
router.post("/", postChat);
/* POST chat */
router.get("/:dealid", getChat);
/* DELETE chat */
router.delete("/:dealid", deleteChatById);

module.exports = router;
