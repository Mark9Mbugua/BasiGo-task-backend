'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'userId');
  }
};
