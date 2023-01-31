const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.js');
const sequelize = require('../libs/sequelize.js');

class ProductService {

  constructor() {
    this.products = []
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => console.log(err));
  }

  generate() {
    const pageSize = 100;
    for (let i = 0; i < pageSize; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock : faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const query = `SELECT * FROM products`;
    const [data] = await sequelize.query(query)
    return data
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found - id: ' + id)
    }
    if(product.isBlock){
      throw boom.conflict('Produc is blocked - id: ' + id);
    }

    return product;
  }

  async update(id, updatedProducts) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found - id:' + id);
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...updatedProducts
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found - id:' + id);
    }

    this.products.splice(index, 1);
    return {id};
  }

}


module.exports = ProductService;
