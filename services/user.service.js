const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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

  async findByEmail(email) {
    const resp = await models.User.findOne({
      where: email
    });
    return resp;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: ['id', 'email'],
      include: 'role'
    });
    if(!user) {
      throw boom.notFound("User not found - id: " + id);
    }
    return user;
  }

  async create(data){
    const pswhash = bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({...data, password:pswhash});
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, data){
    const user = await this.findOne(id);
    await user.update(data);
    return {message: "User updated"};
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {message: "User deleted correctly"};
  }
}


module.exports = UserService;
