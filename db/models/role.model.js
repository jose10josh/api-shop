const {Model, DataTypes} = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
  id: {
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(30)
  }
}


class Role extends Model {

  static associate(models) {
    this.hasMany(models.User, {
      as: 'user',
      foreignKey: 'roleId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

module.exports = { ROLE_TABLE, RoleSchema, Role};
