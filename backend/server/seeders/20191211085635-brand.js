'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Brands', [{
      brand_name: 'Adidas',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'New balance',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'Gucci',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'viet nam',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'chinna',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'USA',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'Nike',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'Pumma',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'Apple',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      brand_name: 'Sony',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
