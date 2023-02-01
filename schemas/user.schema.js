const Joi = require('joi');

const id = Joi.number();
const email = Joi.string().email().min(3).max(30);
const password = Joi.string().min(8);
const role = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
