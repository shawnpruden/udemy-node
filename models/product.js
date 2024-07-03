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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
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
