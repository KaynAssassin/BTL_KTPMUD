'use strict';
module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    password:DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    role:DataTypes.INTEGER,
    avatar: DataTypes.TEXT
  }, {});
  Staff.associate = function(models) {
    Staff.belongsTo(models.Store,{
      foreignKey:'store_id'
    })
    Staff.hasMany(models.Order,{
      foreignKey:'order_id'
    })
  };
  return Staff;
};