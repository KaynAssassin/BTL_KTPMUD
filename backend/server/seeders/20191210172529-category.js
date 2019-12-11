'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      category_name: 'Quần áo',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category_name: 'Giày dép',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category_name: 'Đồ điện tử',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
