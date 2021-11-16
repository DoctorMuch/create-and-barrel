const { Model, DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/connection');

class Whiskey extends Model { }

Whiskey.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      whiskey_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          }
      },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'whiskey'
    }
);

module.exports = Whiskey;