const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('udemy-node', 'root', 'udemy-node', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
