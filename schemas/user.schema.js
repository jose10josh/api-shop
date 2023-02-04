const Joi = require('joi');

const id = Joi.number();
const email = Joi.string().email().min(3).max(30);
const password = Joi.string().min(8);
const role = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  roleId: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  roleId: role
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
