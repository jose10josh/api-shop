'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
    await queryInterface.addColumn(USER_TABLE, 'roleId', UserSchema.roleId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'roleId');
  }
};
