var express = require("express");
var router = express.Router();

const getUser = require("./users-get");
const crateUser = require("./users-post");
const deleteUser = require("./users-delete");
const updateUser = require("./users-update");

/* GET User listing. */
router.get("/:id", getUser);
/* POST User */
router.post("/signup", crateUser);
/* DELETE User */
router.delete("/:id", deleteUser);
/* PUT User */
router.put("/:id", updateUser);

module.exports = router;
