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
            return res.status(200).send({ product });
        } catch (e) {
            console.log(e);
            return res.status(404).send(e);
        }
    },

    exports.addProducts = async (req, res) => {
        // const { Order } = sequelize.models;
        console.log(req.file);
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            return await Product.create(saveObj, {
                include: [
                    { model: Order, as: 'orders' }
                ],
               
            });
            

            // const product = await Product.create(saveObj);

            // return res.status(200).send({ product });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },
    
    exports.getProductsById = async (req, res) => {
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            res.status(200).send({ product: saveObj });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.updateProducts = async (req, res) => {
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            res.status(200).send({ product: saveObj });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.deleteUser = async (req, res) => {
        
        try {
            const decId = req.params.id;
            let saveObj = await Product.findByPk(decId);
            if (!saveObj) return res.status(404).send({ message: 'Id not found' });
            saveObj.destroy();
            res.status(200).send({ message : "Product Successfully Deleted" });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
}