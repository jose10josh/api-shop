const { UserSchema, User} = require('./user.model.js');
const { customerSchema, Customer } = require('./customer.model.js');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));


  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}


module.exports = setUpModels;
