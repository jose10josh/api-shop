const {Model, DataTypes, Sequelize} = require('sequelize');

const {USER_TABLE} = require('./user.model');


const CUSTOMER_TABLE = 'customers';

const customerSchema = {
  userId: {
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as:'user'});
    this.hasMany(models.Order, {
      as:'order',
      foreignKey:'customerId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, customerSchema, Customer};
