var express = require("express");
var router = express.Router();

const getUser = require("./users-get");
const { createUser } = require("./users-post");
const deleteUser = require("./users-delete");
const { updateUser } = require("./users-update");
const loginUser = require("./users-login");

/* GET User listing. */
router.get("/:id", getUser);
/* POST User */
router.post("/signup", createUser);
/* DELETE User */
router.delete("/:id", deleteUser);
/* PUT User */
router.put("/:id", updateUser);
/* POST Login */
router.post("/login", loginUser);

module.exports = router;
