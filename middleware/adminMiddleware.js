
module.exports={

    admin_check:(req, res, next) => {

        if (req.role == 'admin') {

            next();

        }else{
            return res.status(200).json({ status: false, message: `${req.role} are not authorized ` })
        }
     
    }
}