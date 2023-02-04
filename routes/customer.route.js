const express = require('express');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');


const router = express.Router();
const service = new CustomerService();


/**
 * @swagger
 * /api/v1/customers:
 *  get:
 *    tags:
 *      - Customers
 *    description: Return all customers
 *    responses:
 *      '200':
 *        description: An array of customers
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [
 *                {
 *                  "id": 3,
 *                  "email": "test@correo.com",
 *                  "password": "123123123",
 *                }
 *               ]
 */
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /api/v1/customers/{id}:
 *  get:
 *    tags:
 *      - Customers
 *    description: Return a single customer
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the customer to retrieve
 *    responses:
 *      '200':
 *        description: Return a single customer object
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {
 *                  "id": 3,
 *                  "email": "test@correo.com",
 *                  "password": "123123123",
 *                }
 *      '404':
 *        description: Customer not found
 */
router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.findOne(id);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
)


/**
 * @swagger
 * /api/v1/customers:
 *  post:
 *    tags:
 *      - Customers
 *    description: Create a new customer
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "userId": 1,
 *                "name": "Juan",
 *                "lastName": "Perez",
 *                "phone": "123456789",
 *            }
 *    responses:
 *      '201':
 *        description: Return the created customer object
 *      '400':
 *        description: Return a object with the error message
 */
router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/customers/{id}:
 *  patch:
 *    tags:
 *      - Customers
 *    description: Update an existing customer
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the customer to update
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Juan",
 *                "lastName": "Perez",
 *                "phone": "123456789",
 *            }
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '400':
 *        description: Return a object with the error message
 */
router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(200).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/customers/{id}:
 *  delete:
 *    tags:
 *      - Customers
 *    description: Delete an existing customer
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the customer to update
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '400':
 *        description: Return a object with the error message
 */
router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
