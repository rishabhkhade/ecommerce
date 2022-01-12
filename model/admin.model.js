const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const _ = require('lodash');

const AdminModel = sequelize.define('admin', {
    id:  {
		type: Sequelize.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
        type: Sequelize.STRING,
        defaultValue: null,
		allowNull: true
	},
	email: {
        type: Sequelize.STRING,
        defaultValue: null,
		allowNull: true
	},
	mobile_no: {
        type: Sequelize.STRING,
        defaultValue: null,
		allowNull: true
	},
    password: {
        type: Sequelize.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
   
});


AdminModel.getUser = async (reqData) => {
	try {
		return await AdminModel.findOne({
			where: {
				mobile_no: reqData.mobile_no
			},
			attributes: [ 'id', 'name', 'email', 'mobile_no', 'password', ]
		});
	} catch (e) {
		return false;
	}
};

AdminModel.validatePassword = (pass, hashPass) => {
	return bcrypt.compareSync(pass, hashPass);
}

AdminModel.prototype.validPassword = (dbPassword, passwordToMatch) => {
	return bcrypt.compareSync(passwordToMatch, dbPassword);
};

AdminModel.prototype.safeModel = () => {
	return _.omit(this.toObject(), ['password', '__v']);
};

AdminModel.prototype.generatePassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = AdminModel;
