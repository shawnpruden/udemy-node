const http = require('http');

const express = require('express');

const app = express();
app.use((req, res, next) => {
  console.log('middleware');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('server is running!');
});
