"use strict";
module.exports = (sequelize, DataTypes) => {
  let regtype;
  const Lead = sequelize.define(
    "Lead",
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      location: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {}
  );
  Lead.associate = function (models) {
    // associations can be defined here
  };
  return Lead;
};
