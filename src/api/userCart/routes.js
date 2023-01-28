const express = require('express');

const router = express.Router();
const handler = require('./handler');

router.get('/', handler.getUserCart);

module.exports = router;