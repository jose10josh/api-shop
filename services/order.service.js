const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const resp = await models.Order.create(data);
    return resp;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order) {
      throw boom.notFound("Order not found - id: " + id);
    }
    return order;
  }

  //TODO: Add loginc
  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  //TODO: Add loginc
  async delete(id) {
    return { id };
  }


  //Add order detail
  async createDetail(data) {
    const resp = await models.OrderProduct.create(data);
    return resp;
  }
}

module.exports = OrderService;
