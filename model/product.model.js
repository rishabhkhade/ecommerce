const Sequelize = require('sequelize');
const sequelize = require('../config/database');


  const Product = sequelize.define('product', {
        id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
        },
        // order_id: {
        //         type: Sequelize.INTEGER(11),
        //         allowNull: false,
        // },
        product_name: {
                type: Sequelize.STRING(191),
                allowNull: true,
        },
        product_quantity: {
                type: Sequelize.STRING(191),
                allowNull: true,
        },
        product_list: {
                type: Sequelize.STRING(191),
                allowNull: true,
        },
        product_description: {
                type: Sequelize.STRING(191),
                allowNull: true,
        },
        product_image: {
                type: Sequelize.STRING(191),
                allowNull: true
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
                Order.hasMany(models.Product, {
                        foreignKey: "product_id",
                        as: "orders",
                }) ;
                // Order.belongsTo(Product);
        }

module.exports = Product ;
