'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todolist = sequelize.define('Todolist', {
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Todolist.associate = (models) => {
    Todolist.belongsTo(models.User, {
      allowNull: false
    });
  };
  return Todolist;
};