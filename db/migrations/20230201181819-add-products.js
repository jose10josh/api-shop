'use strict';
const {DataTypes, Sequelize} = require('sequelize');

const {CATEGORY_TABLE} = require('../models/category.model');
const {PRODUCT_TABLE} = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.drdropTableop(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
