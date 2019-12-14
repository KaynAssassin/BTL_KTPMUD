'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Customers', 'state')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Customer', 'state',Sequelize.STRING)
  }
};
