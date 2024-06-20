const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');

const rootDir = require('./utils');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) =>
  // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 'Page Not Found' })
);

app.listen(3000, () => console.log('Server is running!'));
