const Joi = require('joi');

const id = Joi.number().integer();
const detail = Joi.string().min(3).max(30);
const customerId = Joi.number().integer();

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);


const createOrderSchema = Joi.object({
  detail: detail.required(),
  customerId: customerId.required()
});

const updateOrderSchema = Joi.object({
  detail
});

const getOrderSchema = Joi.object({
  id: id.required()
});


const createOrderProductSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, createOrderProductSchema };
