const express = require('express');
const path = require('path');

const rootDir = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;