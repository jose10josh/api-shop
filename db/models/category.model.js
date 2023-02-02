const {Model, DataTypes, Sequelize} = require('sequelize');


const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey:true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    unique:true,
    type: DataTypes.STRING(100),
  },
  image: {
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

class Category extends Model {

  static associate(models) {
    this.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category};
