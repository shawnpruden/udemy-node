const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000, () => console.log('Server is running!'));
