const express = require('express');
const productsRouter = require('./products.router.js');
const usersRouter = require('./users.router.js');
const customerRouter = require('./customer.route');
const categoriesRouter = require('./categories.router');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoriesRouter);
}


module.exports = routerApi;
