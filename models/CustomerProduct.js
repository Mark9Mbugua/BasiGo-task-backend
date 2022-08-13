"use strict";
module.exports = (sequelize, DataTypes) => {
  const CustomerProduct = sequelize.define(
    "CustomerProduct",
    {
      customerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    { timestamps: true }
  );
  CustomerProduct.associate = function (models) {
    // associations can be defined here
  };
  return CustomerProduct;
};
