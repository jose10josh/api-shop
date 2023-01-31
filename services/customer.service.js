const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');


class CustomerService {
  constructor() {}


  async find() {
    const resp = await models.Customer.findAll({ include: ['user'] });
    return resp;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const resp = await model.update(changes);
    return resp;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { resp: true };
  }
}



module.exports = CustomerService;
