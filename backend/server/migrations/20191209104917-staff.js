'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Staffs', 'manager_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Staffs', 'password',Sequelize.STRING)
  }
};
