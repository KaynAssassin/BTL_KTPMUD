'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    store_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  Store.associate = function(models) {
    Store.hasMany(models.Staff,{
      foreignKey:'store_id'
    })
    Store.hasMany(models.Order,{
      foreignKey:'store_id'
    })
    Store.hasMany(models.Stock,{
      foreignKey:'store_id'
    })
  };
  return Store;
};