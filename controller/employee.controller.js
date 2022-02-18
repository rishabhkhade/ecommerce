const Employee = require('../model/employee.model');
const bcrypt = require('bcrypt');


    exports.getAllEmployee = async (req, res, next) =>  {
        try {
            const employee = await Employee.findAll({
                attributes: [
					'id', 'name', 'email', 'mobile_no'
				]
            });
            return res.status(200).send({ employee });
        } catch (e) {
            console.log(e);
            return res.status(404).send(e);
        }
    },
    
    exports.getOneEmployee = async (req, res, next) => {
        try {
            const { id } = req.params;
            const employee = await Employee.findByPk(id);
            res.status(200).send(employee);               
            } catch (e) {
            console.log(e);
            return res.status(404).send(e);
        }
    },

    exports.addEmployee = async (req, res, next) => {
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const employee = await Employee.create(saveObj);

            return res.status(200).send({ employee });
        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.updateEmployee = async (req, res, next) => {
        try {
            const saveObj = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const employee = await Employee.create(saveObj);

            return res.status(200).send({ employee });

        } catch (e) {
            console.log(e);
            res.status(404).send(e);
        }
    },

    exports.deleteEmployee = async (req, res, next) => {
        try {
            await Employee.destroy({
                where:{

                    id : req.params.id
                },
                
            })
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
