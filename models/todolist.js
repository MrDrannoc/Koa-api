'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todolist = sequelize.define('Todolist', {
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Todolist.associate = function(models) {
    // associations can be defined here
  };
  return Todolist;
};