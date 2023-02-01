// const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.js');
const { models }= require('./../libs/sequelize');

class ProductService {

  constructor() {
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => console.log(err));
  }

  generate() {
  }

  async create(data){
    const resp = await models.Product.create(data);
    return resp;
  }

  async find() {
    const resp = await models.Product.findAll();
    return resp
  }

  async findOne(id) {
    const resp = await models.Product.findByPk(id);
    if(!resp) {
      throw boom.notFound('Product not found - id: ' + id)
    }
    return resp;
  }

  async update(id, data) {
    const prod = await this.findOne(id);
    const resp = await prod.update(data);
    return resp;
  }

  async delete(id) {
    const resp = await this.findOne(id);
    await resp.destroy();
    return "Product deleted correctly";
  }

}


module.exports = ProductService;
