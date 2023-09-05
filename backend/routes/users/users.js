var express = require('express');
var router = express.Router();

const getUser = require('./users-get');

/* GET users listing. */
router.get('/', getUser);

module.exports = router;