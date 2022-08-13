const db = require("../models/index.js");
const config = require("../config/secrets.config");
const ROLES = config.ROLES;
const User = db.user;

const signUpVerify = {
  checkDuplicateUserNameOrEmail: (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.fullname,
      },
    }).then((user) => {
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          res.json({
            success: "false",
            message: "Email already exists",
          });
          return;
        }
        next();
      });
    });
  },

  checkRolesExisted: (req, res, next) => {
    // for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLES.includes(req.body.role.toUpperCase())) {
      res.json({
        success: "false",
        message: "Specified role does not exist",
      });
      return;
    }
    // }
    next();
  },
};

module.exports = signUpVerify;
