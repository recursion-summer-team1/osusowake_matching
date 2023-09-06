var express = require("express");
var router = express.Router();

const getDealbyRequester = require("./deals-getbyrequester");
const getDealbyOwner = require("./deals-getbyowner");
const postDeal = require("./deals-post");
const updateDealbyfoodId = require("./deals-update");

router.get("/requester/:requesterId", getDealbyRequester);
router.get("/owner/:userId", getDealbyOwner);
router.post("/", postDeal);
router.put("/:foodId", updateDealbyfoodId);

module.exports = router;
