'use strict';

const {OrderSchema, ORDER_TABLE} = require('../models/order.model');
const {OrdersProducsSchema, ORDER_PRODUCT_TABLE} = require('../models/order-products.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrdersProducsSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(ORDER_TABLE);
    await queryInterface.drop(ORDER_PRODUCT_TABLE);
  }
};
