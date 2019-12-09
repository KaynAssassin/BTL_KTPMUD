'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    store_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Stock.associate = function(models) {
    Stock.belongsTo(models.Store,{
      foreignKey:'store_id'
    })
    Stock.belongsTo(models.Product,{
      foreignKey:'product_id'
    })
  };
  return Stock;
};