const fs = require('fs');
const path = require('path');

const rootDir = require('../utils');
const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cbFunc) => {
  fs.readFile(filePath, (error, fileContent) => {
    if (error) {
      return cbFunc([]);
    }

    cbFunc(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll(cbFunc) {
    getProductsFromFile(cbFunc);
  }
};
