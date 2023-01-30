import Sequelize from 'sequelize';
import config from '../config/config.js';
import setUpModels from '../db/models/index.js';


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  loggin: true
});

setUpModels(sequelize);
sequelize.sync();

export default sequelize;
