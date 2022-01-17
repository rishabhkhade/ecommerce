const  sCode = require('../../custom/status-codes');
const { ok, bad_request, un_authorized, server_error } = sCode;
const adminModel = require('../../model/admin.model');

const  getValidationErrMsg = require('../../custom/error-msg');

// validation import here
const loginUser = require('../../helpers/joi.validation');

exports.getLogin = async(req, res) => {
        try {
            // const { error } = loginUser(req.body);
            // if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const admin = await adminModel.getUser(req.body);
            if (!admin) return res.status(bad_request).send( "Email does't exists.");

            if (!adminModel.validatePassword(req.body.password, admin.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, name, email, password, mobile_no } = admin;
            const userSerialize = { id, name, email, password, mobile_no };
            const token = adminModel.generateTokens(userSerialize);

            // create data for current user in refresh token table
            const tokenSave = await UserRefreshToken.saveUserAndTokenData(admin, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { user_refresh_token_id: tokenSave.id });
            res.status(ok).send({ admin, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }

//    exports.getLogout = async(req, res) => {
//         try {
//             const {refresh_token, user_refresh_token_id} = req.body;
//             if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
//             if (!user_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
//             await UserRefreshToken.removeUserToken(req.body);
//             res.status(ok).send({ message: "logout successfully" });
//         } catch (e) {
//             console.log(e);
//             res.status(server_error).send(e);
//         }
//     }
