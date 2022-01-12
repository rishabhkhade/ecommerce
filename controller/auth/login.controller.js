// models import here
const AdminModel = require( '../../model/admin.model');
const Joi = require('@hapi/joi');


// validation import here
// const validateLogin = require('../../helpers/joi.validation');
const validateLogin = (login) => {
    const schema = Joi.object({
        mobile_no: Joi.string().email().required().messages({
            'string.base': `mobile should be a type of 'text'`,
            'string.mobile': `mobile should be a type of 'mobile'`,
            'string.empty': `mobile cannot be an empty field`,
            'any.required': `mobile is a required field`
        }),
        password: Joi.string().required().messages({
            'string.base': `password should be a type of 'text'`,
            'string.empty': `password cannot be an empty field`,
            'any.required': `password is a required field`
        })
    });
    return schema.validate(login, {abortEarly: false});
}

    exports.getLogin = async(req, res) => {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(401).send('mobile_no & password is required field');
            const apple =  await AdminModel.findOne({
                where: {
                    mobile_no: req.body.mobile_no
                    // password: req.body.password
                },
            });
            const admin = await AdminModel.getUser(req.body);
            if (!admin) return res.status(401).send("Mobile no. does't exists.");


            res.status(200).send(apple);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    // exports.getLogout = async(req, res) => {
    //     try {
    //         const {refresh_token, user_refresh_token_id} = req.body;
    //         if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
    //         if (!user_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
    //         await UserRefreshToken.removeUserToken(req.body);
    //         res.status(ok).send({ message: "logout successfully" });
    //     } catch (e) {
    //         console.log(e);
    //         res.status(server_error).send(e);
    //     }
    // }
