const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync, compareSync } = require('bcrypt')
const {sign} = require('jsonwebtoken')


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

    // exports.login = async (req, res, next) => {
    //     try {
    //         //mobile no. check
    //         if(!req.body.mobile_no){
    //             return res.send({
    //                 status:false,
    //                 message:"requires mobile no. to login"
    //                 })
    //         }
    //                 //password check
    //                 const password =req.body.password
    //                 if(!password){
    //                     return res.send({
    //                         status:false,
    //                         message:"Requires a Password"
    //                     })
                        
    //                 }
    //                 const mobile_validate = await db.admin.findOne(
    //                     {
    //                         where:
    //                         {
    //                             mobile_no:req.body.mobile_no
    //                         }
    //                     })
    //                 if(!mobile_validate){
    //                     return res.status(200).json({
    //                          status:false,
    //                          message:"Wrong mobile number"
    //                      })
    //              }
    //                 let user =mobile_validate.dataValues
    //                 const passwordCheck = compareSync(req.body.password,user.password)
    //                 if(!passwordCheck){
    //                     return res.send({
    //                         status:false,
    //                         message:"Wrong Password"
    //                     })
    //                 }
    //                    const token = sign(user, process.env.JWTSECRET, { expiresIn: '1h' });
    //                     res.json({
    //                         success: 1,
    //                         message: "login successfully",
    //                         token: token,
    //                         data:user
    //                       });
    //                       return
    //         }catch(error) {
    //         res.send({
    //             status:false,
    //             message:error
    //         })
    //     }
    // }

// module.exports = {
//     getAllUsers, getOneUsers, addUser, updateUser, deleteUser, login
// }