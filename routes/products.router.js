import express from 'express';
import ProductService from '../services/product.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createProductSchema,
  updateProductSchema,
  getProductSchema
} from '../schemas/product.schema.js';

const router = express.Router();
const service = new ProductService();

/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    tags:
 *      - Products
 *    description: Return all products
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
 *                "isBlock": true},
 *               ]
 */
router.get('/', async (req, res) => {
  const resp = await service.find();
  res.json(resp);
})

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
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *    responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: {"id": "14181250-d0f4-4684-9e4a-b16d78dda352",
 *                "name": "Product Name",
 *                "price": 1850,
 *                "image": "http://placeimg.com/640/480",
 *                "isBlock": true}
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
 *    description: Create a new product products
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "name": "Product Name",
 *                "price": 1850,
 *                "image": "http://placeimg.com/640/480",
 *                "isBlock": true
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
 *                "image": "http://placeimg.com/640/480",
 *                "isBlock": true
 *               }
 */
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct)
  }
)


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateResponse = await service.update(id, body);

    res.json({
      id,
      message: 'Product Updated',
      data: updateResponse
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteResponse = await service.delete(id);
  res.json({
    message: "Product deleted: "+ deleteResponse.id
  });
})


export default router;
