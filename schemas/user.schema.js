import Joi from 'joi';

const id = Joi.number();
const email = Joi.string().min(3).max(30);
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email,
});

const getUserSchema = Joi.object({
  id: id.required()
});

export { createUserSchema, updateUserSchema, getUserSchema };
