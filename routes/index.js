const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin.route')
const productRoutes = require('./product.route')
const orderRoutes = require('./order.route')

router.use('/admin', adminRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

module.exports = router;