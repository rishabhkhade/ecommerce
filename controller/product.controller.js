const Product = require('../model/product.model');
    
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
        console.log(req.file);
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const product = await Product.create(saveObj);

            return res.status(200).send({ product });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },
    
    exports.getProductsById = async (req, res) => {
        try {
            const saveObj = await Product.findAll({
				where: {
					id: req.params.id
				},
                attributes: [
					'id', 'product_name', 'product_quantity', 'product_list',
					'product_description'
				]
			});
            
            return res.status(200).send({ saveObj });

        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.updateProducts = async (req, res) => {
        try {
            const saveObj = {
                ...req.body,
                updatedAt: new Date()
            };
            const product = await Product.create(saveObj);
            return res.status(200).send({ product });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.deleteUser = async (req, res) => {
        
        try {
            await Product.destroy({
                where:{
                    id : req.params.id
                },  
            })
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
}