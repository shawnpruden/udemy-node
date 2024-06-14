const express = require('express');
const path = require('path');

const rootDir = require('../utils');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('logged', path.join(rootDir, 'views', 'add-product.html'));
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
