'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Staffs', [{
      first_name: 'Anh',
      last_name: 'Nguyen',
      email: 'nguyenta.hit@gmail.com',
      phone: 123456789,
      active: true,
      store_id: 1,
      block: false,
      role:1,
      password:"123456",
      avatar: "",
      createdAt:new Date(),
      updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Staffs', null, {});
  }
};