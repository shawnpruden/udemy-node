const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(filePath, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(id, product.price);
        }
      });

      // cbFunc(product);
    });
  }

  static fetchAll(cbFunc) {
    getProductsFromFile(cbFunc);
  }

  static findById(id, cbFunc) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);

      cbFunc(product);
    });
  }
};
