const express = require('express');
const path = require('path');

const rootDir = require('../utils');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: "Shawn's Shop",
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
