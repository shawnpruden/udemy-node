const express = require('express');

const app = express();
app.use((req, res, next) => {
  console.log('middleware');

  next();
});

app.use((req, res) => {
  res.send('<h1>Hello, world!</h1>');
});

app.listen(3000, () => console.log('Server is running!'));
