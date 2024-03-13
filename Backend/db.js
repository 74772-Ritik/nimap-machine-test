const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nimap', 'root', 'Ritikc@2000', {
  dialect: 'mysql'
});

module.exports = sequelize;
