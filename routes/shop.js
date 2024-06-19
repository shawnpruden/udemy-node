const express = require('express');
const path = require('path');

const rootDir = require('../utils');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop');
});

module.exports = router;
