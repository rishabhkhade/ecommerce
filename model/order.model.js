const Sequelize = require('sequelize');
const sequelize = require('../config/database');


  const Order = sequelize.define('order', {
        id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
        },
        product_id: {
                allowNull: false,
                type: Sequelize.INTEGER
        },
        order_name: {
                type: Sequelize.STRING(191),
                allowNull: false,
        },
        order_quantity: {
                type: Sequelize.STRING(191),
                allowNull: false,
        },
        order_list: {
                type: Sequelize.STRING(191),
                allowNull: false,
        },
        order_price: {
                type: Sequelize.STRING(191),
                allowNull: false,
        },
        purchase_date: {
                type: Sequelize.STRING(191),
                allowNull: false,
        },
        delivered_date: {
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
                tableName: 'orders',
        });

    Order.associate = function (models) {
        // associations can be defined here
        
    };


module.exports = Order ;
