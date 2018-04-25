'use strict';
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    adresse: DataTypes.STRING
  }, {});
  Company.associate = (models) => {
    Company.hasMany(models.Job);
  };
  return Company;
};