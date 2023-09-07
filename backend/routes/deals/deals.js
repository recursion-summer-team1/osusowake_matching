var express = require("express");
var router = express.Router();

const getDealbyRequester = require("./deals-getbyrequester");
const getDealbyOwner = require("./deals-getbyowner");
const postDeal = require("./deals-post");
const updateDealbydealId = require("./deals-update");

router.get("/requester/:requesterId", getDealbyRequester);
router.get("/owner/:userId", getDealbyOwner);
router.post("/", postDeal);
router.put("/:dealId", updateDealbydealId);

module.exports = router;
