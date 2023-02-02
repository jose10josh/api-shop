const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema,
createOrderProductSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const resp = await service.find();
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.findOne(id);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const resp = await service.create(body);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const resp = await service.update(id, body);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({message: 'Order deleted correctly - id:' +id});
    } catch (error) {
      next(error);
    }
  }
);


//Order-Product
router.post('/detail',
  validatorHandler(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const resp = await service.createDetail(body);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
