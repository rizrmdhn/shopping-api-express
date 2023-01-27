const express = require('express');

const router = express.Router();
const handler = require('./handler');

router.get('/', handler.getItems);
router.get('/:id', handler.getItemById);

module.exports = router;