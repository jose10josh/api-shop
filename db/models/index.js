const { UserSchema, User} = require('./user.model.js');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}


module.exports = setUpModels;
