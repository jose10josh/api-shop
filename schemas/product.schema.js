import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();

const productSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required()
});

export { productSchema, createProductSchema, updateProductSchema, getProductSchema };
