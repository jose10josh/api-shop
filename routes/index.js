import express from 'express';
import productsRouter from './products.router.js';
import usersRouter from './users.router.js';



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
}


export default routerApi;
