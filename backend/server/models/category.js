'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
   Category.hasMany(models.Product,{
     foreignKey:'category_id'
   })
  };
  return Category;
};