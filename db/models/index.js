const { UserSchema, User} = require('./user.model.js');
const { customerSchema, Customer } = require('./customer.model.js');
const { CategorySchema, Category } = require('./category.model.js');
const { ProductSchema, Product } = require('./product.model.js');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));


  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}


module.exports = setUpModels;
