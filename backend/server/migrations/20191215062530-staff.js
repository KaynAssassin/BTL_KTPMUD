'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Staffs', 'block')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Staffs', 'block',Sequelize.BOOLEAN)
  }
};
