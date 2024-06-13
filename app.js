const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => res.status(404).send('<h2>Page Not Found</h2>'));

app.listen(3000, () => console.log('Server is running!'));
