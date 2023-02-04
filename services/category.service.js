const boom = require('@hapi/boom');
const { Op } = require("sequelize");

const { models }= require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }

  async find() {
    const categories = await models.Category.findAll({attributes: ['id', 'name', 'image']});
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      attributes: ['id', 'name', 'image'],
      include: [
        {
          model: models.Product,
          as:'product',
          attributes:['id', 'name', 'price', 'description', 'image', 'qty'],
          where: {
            hidden: 0,
            qty: {
              [Op.gte]: 1
            }
          },
          required: false
        }
      ]
    });
    if(!category) {
      throw boom.notFound("Category not found - id: " + id);
    }
    return category;
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const category = await this.findOne(id);
    await category.update(data);
    return {message: "Category updated correctly"};
  }

  async delete(id) {
    const resp = await this.findOne(id);
    await resp.destroy();
    return {message: "Category deleted correctly"};
  }

}

module.exports = CategoryService;
