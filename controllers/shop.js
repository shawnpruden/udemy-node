const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((error) => console.error(error));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-details', {
        product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((error) => console.error(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: "Shawn's Shop",
        path: '/',
      });
    })
    .catch((error) => console.error(error));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products,
      });
    })
    .catch((error) => console.error(error));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      console.log(products);
      let product;
      if (products.length > 1) {
        product = products[0];
      }

      // existing product
      let newQty = 1;
      if (product) {
      }

      // new product
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQty },
          });
        })
        .catch((error) => console.error(error));
    })
    .then(() => res.redirect('/cart'))
    .catch((error) => console.error(error));
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
