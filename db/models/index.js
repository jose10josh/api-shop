import { UserSchema, User} from './user.model.js';

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}


export default setUpModels;
