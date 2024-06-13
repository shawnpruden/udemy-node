const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="post"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
});

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.listen(3000, () => console.log('Server is running!'));
