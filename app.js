const express = require('express');

const app = express();
app.use('/dashboard', (req, res, next) => {
  res.send('<h1>Dashboard</h1>');
});

app.use('/', (req, res) => {
  res.send('<h1>Hello, world!</h1>');
});

app.listen(3000, () => console.log('Server is running!'));
