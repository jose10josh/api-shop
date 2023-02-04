// const faker = require('faker');
const { Op } = require("sequelize");
const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class ProductService {

  constructor() {}

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

    let whereClause = {hidden: 0};
    const priceFilter = this.getPriceFilter(minprice, maxprice);
    whereClause = {...whereClause, ...priceFilter}

    const options = {
      attributes: ['id', 'name', 'price', 'description', 'image', 'qty'],
      include: [
        {
          model: models.Category,
          as:'category',
          attributes:['id', 'name', 'image']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: whereClause
    };

    const resp = await models.Product.findAll(options);
    return resp
  }

  async findOne(id) {
    const whereClause = {
      id: id,
      hidden: 0
    };


    const options = {
      attributes: ['id', 'name', 'price', 'description', 'image', 'qty'],
      include: [
        {
          model: models.Category,
          as:'category',
          attributes:['id', 'name', 'image']
        }
      ],
      where: whereClause
    }

    const resp = await models.Product.findOne(options);
    if(!resp) {
      throw boom.notFound('Product not found - id: ' + id)
    }
    return resp;
  }

  async update(id, data) {
    const prod = await this.findOne(id);
    await prod.update(data);
    return {message: "Product updated correctly"};
  }

  async delete(id) {
    const resp = await this.findOne(id);
    await resp.destroy();
    return {message: "Product deleted correctly"};
  }


  getPriceFilter(minPrice, maxPrice) {
    let whereClause = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
      whereClause = {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      };
    } else if (minPrice !== undefined) {
      whereClause = {
        price: {
          [Op.gte]: minPrice
        }
      };
    } else if (maxPrice !== undefined) {
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
