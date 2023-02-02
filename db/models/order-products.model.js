const {Model, DataTypes} = require('sequelize');

const {ORDER_TABLE} = require('./order.model.js');
const {PRODUCT_TABLE} = require('./product.model.js');


const ORDER_PRODUCT_TABLE = 'orders_products';

const OrdersProducsSchema = {
  id:{
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}

class OrderProduct extends Model {

  // static associate(models) {
  //   this.belongsToMany()
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrdersProducsSchema, OrderProduct};
