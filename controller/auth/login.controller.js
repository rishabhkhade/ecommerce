const adminModel = require('../../model/admin.model');
const jwt = require('jsonwebtoken');

// validation import here
const loginUser = require('../../helpers/joi.validation');

exports.getLogin = async(req, res) => {
        try {
            // const admin = await adminModel.getUser(req.body);
            const admin = await req.body;
            const token = jwt.sign(admin, process.env.JWT_SECRET,{ expiresIn: '1h' });
            Object.assign(token);
            res.status(200).send({ token, admin });

        } catch (e) {
            console.log(e);
            res.status(401).send(e);
        }
    }


