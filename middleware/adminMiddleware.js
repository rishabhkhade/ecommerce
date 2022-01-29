const jwt = require("jsonwebtoken");
// const db = require("../model/index")

module.exports = {
    checkToken: async(req, res, next) => {
      let token = req.get("authorization");
      if (token) {
        token = token.slice(7);
        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            req.admin = decoded
          if (err) {
            return res.json({
              status:false,
              message: "Invalid Token..."
            });
          }
          req.role = decoded.role
          next()
        });
      } else {
        return res.json({
            status:false,
          message: "Invalid Token! Unauthorized Admin"
        });
      }
    }
  };