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

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound("User not found - id: " + id);
    }
    return user;
  }

  async create(data){
    const newUser = await models.User.create(data);
    console.log("New User", newUser);
    return newUser;
  }

  async update(id, data){
    const user = await this.findOne(id);
    const resp = await user.update(data);
    console.log("Updated User", user);
    return resp;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    console.log("Updated User", user);
    return "User deleted correctly";
  }
}


export default UserService;
