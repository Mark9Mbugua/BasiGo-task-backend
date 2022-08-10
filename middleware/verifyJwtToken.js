const jwt = require("jsonwebtoken");
const config = require("../config/secrets.config.js");
// const db = require("../models/index.js");
// const Role = db.role;
// const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.json({
      success: false,
      status: 403,
      accesstoken: null,
      message: "No auth token provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        status: 500,
        accesstoken: null,
        message: "Failed to authenticate current user",
      });
    }
    req.userId = decoded.user.id;
    req.userName = decoded.user.username;
    next();
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
