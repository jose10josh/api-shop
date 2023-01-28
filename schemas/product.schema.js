import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const price = Joi.number().integer().min(5);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price
});

const getProductSchema = Joi.object({
  id: id.required()
});

export { createProductSchema, updateProductSchema, getProductSchema };
