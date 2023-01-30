import boom from '@hapi/boom';

import pool from '../libs/postgres.js';
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;


class UserService {

  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.log(err));
  }


  async find() {
    const resp = await models.User.findAll();
    return resp;
  }
}


export default UserService;
