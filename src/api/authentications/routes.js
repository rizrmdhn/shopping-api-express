const express = require('express');

const router = express.Router();
const handler = require('./handler');

router.post('/', handler.postAuthentications);
router.put('/', handler.putAuthentications);
router.delete('/', handler.deleteAuthentications);

module.exports = router;