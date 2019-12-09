'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customer_id: DataTypes.INTEGER,
    order_status: DataTypes.INTEGER,
    order_date: DataTypes.INTEGER,
    required_date: DataTypes.INTEGER,
    shipped_date: DataTypes.INTEGER,
    store_id:DataTypes.INTEGER,
    staff_id:DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Customer,{
      foreignKey:'customer_id'
    })
    Order.belongsTo(models.Staff,{
      foreignKey:'staff_id'
    })
    Order.belongsTo(models.Store,{
      foreignKey:'store_id'
    })
    Order.hasMany(models.OrderItem,{
      foreignKey:'order_id'
    })
  };
  return Order;
};