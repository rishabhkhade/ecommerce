const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const Order = require('../model/order.model');
    
exports.getOrders = async (req, res) => {
        try {
            const order = await Order.findAndCountAll({
                order: [['id', 'ASC']],
                attributes: [
                    'id', 'product_id','order_name', 'order_quantity', 'order_list',
                    'order_price','purchase_date','delivered_date'
                ]
            })
                let obj = resPattern.successPattern(httpStatus.OK, order, 'success');
                return res.status(obj.code).json(obj);

            // return res.status(200).send({ order });
        } catch (e) {
              return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));

            // console.log(e);
            // return res.status(404).send(e);
        }
    },

    exports.addOrders = async (req, res) => {
        console.log(req.file);
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const order = await Order.create(saveObj);
            let obj = resPattern.successPattern(httpStatus.OK, order, 'success');
            return res.status(obj.code).json(obj);
            // return res.status(200).send({ order });
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));

            // console.log(e);
            // res.status(404).send(e);
        }
    },
    
    exports.getOrdersById = async (req, res, next) => {
        try {
            const decId = req.params.id;
            let saveObj = await Order.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
            // res.status(200).send({ order: saveObj });
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));

            // console.log(e);
            // res.status(404).send(e);
        }
    },
    
    exports.updateOrders = async (req, res,next) => {
        try {
            const decId = req.params.id;
            let saveObj = await Order.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
            // res.status(200).send({ order: saveObj });
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));

            // console.log(e);
            // res.status(404).send(e);
        }
    },

    exports.deleteOrders = async (req, res) => {
        
        try {
            const decId = req.params.id;
            let saveObj = await Order.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            saveObj.destroy();
            let obj = resPattern.successPattern(httpStatus.OK, saveObj, 'success');
            return res.status(obj.code).json(obj);
            // res.status(200).send({ message : "Order Successfully Deleted" });
        } catch (e) {
            return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
            // console.log(e);
            // res.status(404).send(e);
        }
}