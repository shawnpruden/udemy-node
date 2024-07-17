const express = require('express');
const path = require('path');

const errorController = require('./controllers/error');

const rootDir = require('./utils');

const sequelize = require('./database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
sequelize
  .sync({ force: true })
  .then((results) => {
    app.listen(3000);
  })
  .catch((error) => console.error(error));
