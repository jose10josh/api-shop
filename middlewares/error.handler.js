const { ValidationError } = require("sequelize");

function logErrors (err, req, res, next) {
  console.error("logError: - " + err);
  next(err)
}


function boomErrorHandler (err, req, res, next) {
  console.error("boomErrorHandler: ", err);
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next();
}

function ormErrorHandler (err, req, res, next) {
  console.error("ormErrorHandler: ", err);
  if(err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  };

  if (err.name === 'SequelizeConnectionRefusedError') {
    console.error('Failed to connect to the database: ', err);
    res.status(500).json({
      statusCode: 500,
      message: err.name,
      errors: 'Failed to connect to the database'
    })
  };

  next(err);
}


function errorHandler (err, req, res, next) {
  console.error("errorHandler: ", err);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}


module.exports = {logErrors, errorHandler, boomErrorHandler, ormErrorHandler};
