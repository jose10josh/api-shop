'use strict';

const {DataTypes, Sequelize} = require('sequelize');

const {CUSTOMER_TABLE} = require('../models/customer.model.js');
const { ORDER_TABLE} = require('../models/order.model');
const { PRODUCT_TABLE} = require('../models/product.model');


const {ORDER_PRODUCT_TABLE} = require('../models/order-products.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        filed: 'customer_id',
        references: {
          model: CUSTOMER_TABLE,
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id:{
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        filed: 'order_id',
        references: {
          model: ORDER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        filed: 'product_id',
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.drop(ORDER_TABLE);
    await queryInterface.drop(ORDER_PRODUCT_TABLE);
  }
};
