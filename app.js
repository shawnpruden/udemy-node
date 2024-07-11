const express = require('express');
const path = require('path');

const errorController = require('./controllers/error');

const rootDir = require('./utils');
const db = require('./database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('SELECT * FROM products')
  .then((result) => console.log(result[0]))
  .catch((error) => console.error(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000, () => console.log('Server is running!'));
