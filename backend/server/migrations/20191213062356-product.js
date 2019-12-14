'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Products', 'price',Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Products', 'price',Sequelize.INTEGER)
  }
};
