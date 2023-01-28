const express = require('express');

const router = express.Router();
const handler = require('./handler');

router.get('/', handler.getItems);
router.get('/:id', handler.getItemById);
router.post('/:id', handler.addItemToCart);
router.delete('/:id', handler.removeItemFromCart);

module.exports = router;