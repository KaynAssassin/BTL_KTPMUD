'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    avatar: DataTypes.TEXT
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Order,{
      foreignKey:'customer_id'
    })
  };
  return Customer;
};