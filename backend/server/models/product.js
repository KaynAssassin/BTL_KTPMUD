'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_name: DataTypes.STRING,
    brand_id: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    date_import: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category,{
      foreignKey:'category_id'
    })
    Product.belongsTo(models.Brand,{
      foreignKey:'brand_id'
    })
    Product.hasOne(models.Stock,{
      foreignKey:'product_id'
    })
    Product.hasMany(models.OrderItem,{
      foreignKey:'product_id'
    })
  };
  return Product;
};