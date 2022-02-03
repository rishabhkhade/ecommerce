const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const Product = require('../model/product.model');
const Order = require('../model/order.model');

exports.getProducts = async (req, res) => {
        try {
            const product = await Product.findAndCountAll({
                order: [['id', 'ASC']],
                attributes: [
                    'id', 'product_name', 'product_quantity', 'product_list',
                    'product_description', //'product_image'
                ]
            })     
                let obj = resPattern.successPattern(httpStatus.OK, product, 'success');
                return res.status(obj.code).json(obj);               
        } catch (e) {
                return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
        }
    },

    exports.addProducts = async (req, res, next) => {
        try {
            const saveObj = {
                ...req.body
            };
            console.log(saveObj,">>>>.");
            console.log(req.body,">>>>.");
            const proDuct = await Product.create(saveObj);
                let obj = resPattern.successPattern(httpStatus.OK, proDuct, 'success');
                return res.status(obj.code).json(obj); 
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
        }
    },
    
    exports.getProductsById = async (req, res) => {
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
        }
    },

    exports.updateProducts = async (req, res) => {
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
        }
    },

    exports.deleteUser = async (req, res) => {
        
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            saveObj.destroy();
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
        }
}