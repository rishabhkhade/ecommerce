const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin.route')
const productRoutes = require('./product.route')

router.use('/admin', adminRoutes);
router.use('/product', productRoutes);

module.exports = router;