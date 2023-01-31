const Joi = require('joi');


const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

//User Model
const userId = Joi.number().integer();


const getCustomerSchema = Joi.object({
  userId: userId.required()
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
  phone,
  userId
});


module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
