'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Products', 'date_import',Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Products', 'date_import',Sequelize.INTEGER)
  }
};
