import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

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

const whiteList = ['http://localhost:8080', 'https://myurl.com'];
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (whiteList.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



routerApi(app);
app.listen(port, () => {
  console.log("Server corriendo en puerto: ", port);
});
