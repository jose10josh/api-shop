const express = require('express');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();


/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    tags:
 *      - Categories
 *    description: Return all categories
 *    responses:
 *      '200':
 *        description: An array of categories
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [
 *                 {
 *                   "id": 1,
 *                   "name": "Zapatos",
 *                   "image": "https://images.com"
 *                 }
 *               ]
*/
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /api/v1/categories/{id}:
 *  get:
 *    tags:
 *      - Categories
 *    description: Return a single category
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the category to retrieve
 *    responses:
 *       200:
 *         description: A category object
 *         schema:
 *           type: object
 *           example: {
 *             "id": 1,
 *             "name": "Zapatos",
 *             "image": "https://images.com",
 *             "product": [
 *               {
 *                 "id": 6,
 *                 "name": "Product Name",
 *                 "price": 150,
 *                 "description": "Product description",
 *                 "image": "http://placeimg.com/640/480",
 *                 "qty": 2
 *               }
 *             ]
 *           }
 *       '404':
 *          description: Product not found
 */
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    tags:
 *      - Categories
 *    description: Create a new category
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Category Name",
 *                "image": "http://placeimg.com/640/480",
 *            }
 *    responses:
 *      '201':
 *        description: The created category object
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: {
 *                "id": 1,
 *                "name": "Category Name",
 *                "image": "http://placeimg.com/640/480",
 *               }
 */
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/categories/{id}:
 *  patch:
 *    tags:
 *      - Categories
 *    description: Update an existing a category
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the category to update
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Category Name",
 *                "image": "http://placeimg.com/640/480",
 *            }
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: category not found
 */
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *    tags:
 *      - Categories
 *    description: Create a new category
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the category to delete
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: category not found
 */
router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.delete(id);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
