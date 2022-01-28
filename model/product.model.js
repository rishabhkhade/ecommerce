const Sequelize = require('sequelize');
const sequelize = require('../config/database');


  const Product = sequelize.define('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_name: {
            type: Sequelize.STRING(191),
            allowNull: false,
    },
    product_quantity: {
            type: Sequelize.STRING(191),
            allowNull: false,
    },
    product_list: {
            type: Sequelize.STRING(191),
            allowNull: false,
    },
    product_description: {
            type: Sequelize.STRING(191),
            allowNull: false,
      },
    createdAt: {
            allowNull: false,
            type: Sequelize.DATE
    },
    updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
  }
    }, {
        tableName: 'products',
    });

    Product.associate = function (models) {
        // associations can be defined here
    };


module.exports = Product ;
