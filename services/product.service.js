// const faker = require('faker');
const { Op } = require("sequelize");
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

  async find(query) {
    let { limit, offset, minprice, maxprice } = query;

    if(!limit) {
      limit = 10;
    }
    if(!offset){
      offset = 0;
    }

    const whereClause = this.getPriceFilter(minprice, maxprice);

    const options = {
      include: ['category'],
      limit,
      offset,
      where: whereClause
    };

    const resp = await models.Product.findAll(options);
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


  getPriceFilter(minPrice, maxPrice) {
    let whereClause = {};
    if (minPrice !== null && maxPrice !== null) {
      whereClause = {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      };
    } else if (minPrice !== null) {
      whereClause = {
        price: {
          [Op.gte]: minPrice
        }
      };
    } else if (maxPrice !== null) {
      whereClause = {
        price: {
          [Op.lte]: maxPrice
        }
      };
    }
    return whereClause;
  }

}


module.exports = ProductService;
