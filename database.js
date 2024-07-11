const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'udemy-node',
  password: 'udemy-node',
});

module.exports = pool.promise();
