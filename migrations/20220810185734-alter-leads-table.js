"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Leads", "type", {
      type: Sequelize.INTEGER,
      after: "userId",
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Leads", "type");
  },
};
