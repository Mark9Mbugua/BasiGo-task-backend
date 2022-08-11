"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      leadId: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      annualEarning: DataTypes.INTEGER,
    },
    { timestamps: true }
  );
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};
