const Sequelize = require('sequelize');

const sequelize = new Sequelize('velvet910', 'yasuo', '123456', {
    host: 'localhost',
    dialect:'postgres'
});

module.exports = sequelize