'use strict';
const {DataTypes} = require('sequelize');


const { ROLE_TABLE } = require('./../models/role.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30)
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
