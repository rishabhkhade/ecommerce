const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync, compareSync } = require('bcrypt')


    exports.getAllUsers = async (req, res, next) =>  {
        try {
            const admin = await Admin.findAll({
                attributes: [
					'id', 'name', 'email', 'mobile_no'
				]
            });
            return res.status(200).send({ admin });
        } catch (e) {
            console.log(e);
            return res.status(404).send(e);
        }
    },
    
    exports.getOneUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id);
            res.status(200).send(admin);               
            } catch (e) {
            console.log(e);
            return res.status(404).send(e);
        }
    },

    exports.addUser = async (req, res, next) => {
        try {
            const hashPassword = hashSync(req.body.password, genSaltSync(10), null);
            const saveObj = {
                ...req.body,
                password: hashPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const admin = await Admin.create(saveObj);

            return res.status(200).send({ admin });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    exports.updateUser = async (req, res, next) => {
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const admin = await Admin.create(saveObj);

            return res.status(200).send({ admin });

        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    exports.deleteUser = async (req, res, next) => {
        try {
            await Admin.destroy({
                where:{

                    id : req.params.id
                },
                
            })
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
