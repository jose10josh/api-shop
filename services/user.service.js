const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.js');
const { models }= require('./../libs/sequelize');


class UserService {

  constructor() {
  }


  async find() {
    const resp = await models.User.findAll({
      attributes: ['id', 'email'],
      include: 'role'
    });
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
    return newUser;
  }

  async update(id, data){
    const user = await this.findOne(id);
    const resp = await user.update(data);
    return resp;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return "User deleted correctly";
  }
}


module.exports = UserService;
