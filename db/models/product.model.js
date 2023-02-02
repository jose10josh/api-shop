const {Model, DataTypes, Sequelize} = require('sequelize');

const {CATEGORY_TABLE} = require('./category.model');


const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    unique:true,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  qty: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  hidden: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  categoryId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    filed: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Product extends Model {

  static associate(models) {
    this.belongsTo(models.Category, {as: 'category'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product};
