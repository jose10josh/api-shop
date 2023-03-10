const {Model, DataTypes, Sequelize} = require('sequelize');

const {CUSTOMER_TABLE} = require('./customer.model.js');
const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  details: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'userId'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  total:{
    type:DataTypes.VIRTUAL,
    get() {
      if(this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
  }
}


class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order};
