'use strict';

const { ORDER_TABLE, OrderSchema } = require('./../models/order.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(ORDER_TABLE, 'details', OrderSchema.details);

    await queryInterface.addColumn(PRODUCT_TABLE, 'qty', ProductSchema.qty);
    await queryInterface.addColumn(PRODUCT_TABLE, 'hidden', ProductSchema.hidden);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(ORDER_TABLE, 'details');

    await queryInterface.removeColumn(PRODUCT_TABLE, 'qty');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'hidden');
  }
};
