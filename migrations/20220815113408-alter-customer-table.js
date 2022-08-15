"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Customers", "annualEarning", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Customers", "annualEarning", {
      type: Sequelize.INTEGER,
    });
  },
};
