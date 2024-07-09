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

  Product.findById(prodId, (product) => {
    console.log(product);
    if (!product) return res.redirect('/');

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: 'admin/products',
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  console.log({ title, imageUrl, description, price });
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, description, price } = req.body;
  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log({ prodId });
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
