const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      if (!product) return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
      });
    })
    .catch((error) => console.error(error));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((error) => console.error(error));
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;

  req.user
    .createProduct({ title, imageUrl, description, price })
    .then((result) => {
      res.redirect('/admin/products');
      console.log('Product Created!');
    })
    .catch((error) => console.error(error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, description, price } = req.body;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;

      return product.save();
    })
    .then((result) => {
      res.redirect('/admin/products');
      console.log('Product Updated!');
    })
    .catch((error) => console.error(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect('/admin/products');
      console.log('Product Deleted!');
    })
    .catch((error) => console.error(error));
};
