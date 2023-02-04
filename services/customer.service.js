const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');


class CustomerService {
  constructor() {}


  async find() {
    const resp = await models.Customer.findAll({
      attributes: ['userId', 'name', 'lastName', 'phone'],
      include: [
        {
          model: models.User,
          as:'user',
          attributes:['email'],
          include: [{
            model: models.Role,
            as:'role',
          }]
        }
      ]
    });
    return resp;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      attributes: ['userId', 'name', 'lastName', 'phone'],
      include: [
        {
          model: models.User,
          as:'user',
          attributes:['email'],
          include: [{
            model: models.Role,
            as:'role',
          }]
        }
      ]
    });
    if (!customer) {
      throw boom.notFound('Customer not found - id: ' + id);
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, data) {
    const model = await this.findOne(id);
    await model.update(data);
    return { message: "Customer updated correctly" };
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { message: "Customer deleted correctly" };
  }
}



module.exports = CustomerService;
