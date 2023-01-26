import express from 'express';
import ProductService from '../services/product.service.js';


const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
})

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);

  res.status(201).json(newProduct)
})


router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updateResponse = service.update(id, body);

  res.json({
    id,
    message: 'Product Updated',
    data: updateResponse
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteResponse = service.delete(id);
  res.json({
    message: "Product deleted: "+ deleteResponse.id
  });
})


export default router;
