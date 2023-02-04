const express = require('express');
const ProductService = require('../services/product.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('../schemas/product.schema.js');

const router = express.Router();
const service = new ProductService();

/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    tags:
 *      - Products
 *    description: Return all products
 *    parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limit of product to retrive
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: start index
 *       - in: query
 *         name: minprice
 *         schema:
 *           type: integer
 *         required: false
 *         description: min price to filter from
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         required: false
 *         description: max price to filter from
 *    responses:
 *      '200':
 *        description: An array of products
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [
 *                {"id": "14181250-d0f4-4684-9e4a-b16d78dda352",
 *                "name": "Product Name",
 *                "price": 1850,
 *                "image": "http://placeimg.com/640/480",
 *                },
 *               ]
*/
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const resp = await service.find(req.query);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/products/{id}:
 *  get:
 *    tags:
 *      - Products
 *    description: Return a single product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the product to retrieve
 *    responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {"id": "14181250-d0f4-4684-9e4a-b16d78dda352",
 *                "name": "Product Name",
 *                "price": 1850,
 *                "image": "http://placeimg.com/640/480",
 *                }
 *       '404':
 *        description: Product not found
 */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/products:
 *  post:
 *    tags:
 *      - Products
 *    description: Create a new product
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Product Name",
 *                "price": 1850,
 *                "description": "Product description",
 *                "image": "http://placeimg.com/640/480",
 *                "categoryId": 1,
 *                "qty": 3,
 *                "hidden": true
 *            }
 *    responses:
 *      '201':
 *        description: The created product object
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: {
 *                "id": "14181250-d0f4-4684-9e4a-b16d78dda352",
 *                "name": "Product Name",
 *                "price": 1850,
 *                "description": "Product description",
 *                "image": "http://placeimg.com/640/480",
 *                "categoryId": 1
 *               }
 */
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error);
    }
  }
)


/**
 * @swagger
 * /api/v1/products/{id}:
 *  patch:
 *    tags:
 *      - Products
 *    description: Update an existing a product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the product to update
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Product Name",
 *                "price": 1850,
 *                "description": "Product description",
 *                "image": "http://placeimg.com/640/480",
 *                "categoryId": 1
 *            }
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: Product not found
 */
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const resp = await service.update(id, body);

    res.json(resp)
  } catch (error) {
    next(error);
  }
})


/**
 * @swagger
 * /api/v1/products/{id}:
 *  delete:
 *    tags:
 *      - Products
 *    description: Create a new product
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the product to delete
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: Product not found
 */
router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.delete(id);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
