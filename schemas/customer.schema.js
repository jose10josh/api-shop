const Joi = require('joi');


const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

const userId = Joi.number().integer();


const getCustomerSchema = Joi.object({
  id: userId.required()
});

const createCustomerSchema = Joi.object({
  userId: userId.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone
});


module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
