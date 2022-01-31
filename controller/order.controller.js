const Order = require('../model/order.model');
    
exports.getOrders = async (req, res) => {
        try {
            const order = await Order.findAndCountAll({
                order: [['id', 'ASC']],
                attributes: [
                    'id', 'order_name', 'order_quantity', 'order_list',
                    'order_price','purchase_date','delivered_date'
                ]
            })                    
            return res.status(200).send({ order });
        } catch (e) {
            console.log(e);
            return res.status(404).send(e);
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

            return res.status(200).send({ order });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },
    
    exports.getOrdersById = async (req, res) => {
        try {
            const saveObj = await Order.findAll({
				where: {
					id: req.params.id
				},
                attributes: [
					'id', 'order_name', 'order_quantity', 'order_list',
                    'order_price','purchase_date','delivered_date'
				]
			});
            
            return res.status(200).send({ saveObj });

        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.updateOrders = async (req, res) => {
        try {
            const saveObj = {
                ...req.body,
                updatedAt: new Date()
            };
            const order = await Order.create(saveObj);
            return res.status(200).send({ order });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.deleteOrders = async (req, res) => {
        
        try {
            await Order.destroy({
                where:{
                    id : req.params.id
                },  
            })
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
}