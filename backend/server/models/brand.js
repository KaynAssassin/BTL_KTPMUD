'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    brand_name: DataTypes.STRING
  }, {});
  Brand.associate = function(models) {
    Brand.hasMany(models.Product,{
      foreignKey:'brand_id'
    })
  };
  return Brand;
};