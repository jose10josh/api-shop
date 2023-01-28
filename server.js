import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import routerApi from './routes/index.js';
import {logErrors, errorHandler, boomErrorHandler} from './middlewares/error.handler.js';

const app = express();
const port = 3000;


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Store API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);

app.use(express.json());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
  console.log("Server corriendo en puerto: ", port);
});
