const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`


const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  loggin: true
});

setUpModels(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    if (err.name === 'SequelizeConnectionRefusedError') {
      console.error('Failed to connect to the database: ',);
    } else {
      throw err;
    }
  });

module.exports = sequelize;
