const fs = require('fs');
const path = require('path');

const rootDir = require('../utils');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const filePath = path.join(rootDir, 'data', 'products.json');
    fs.readFile(filePath, (error, fileContent) => {
      let products = [];
      if (!error) {
        products = JSON.parse(fileContent);
      }
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll() {
    const filePath = path.join(rootDir, 'data', 'products.json');
    fs.readFile(filePath, (error, fileContent) => {
      if (error) return [];

      return JSON.parse(fileContent);
    });
  }
};
