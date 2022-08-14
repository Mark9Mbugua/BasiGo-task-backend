const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../models/index.js");
const config = require("../config/secrets.config");

exports.verifyToken = (req, res) => {
  // If JWT middleware passed the test return true
  res.json({
    success: true,
    message: "Valid user!",
  });
};

/**
 * Create user role
 * @param {*} req
 * @param {*} res
 */
exports.createUserRole = async (req, res) => {
  try {
    const { type } = req.body;

    const newUserRole = await db.role.create({
      type,
    });

    res.json({
      success: true,
      message: "User role created successfully",
      data: newUserRole,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * List user roles function
 * @param {*} req
 * @param {*} res
 */
exports.listUserRoles = async (req, res) => {
  try {
    const userRoles = await db.role.findAll({});

    res.json({
      success: true,
      message: "All user roles retrived successfully",
      data: userRoles,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

exports.fetchUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUserRole = await db.role.findOne({
      where: { id: Number(id) },
    });

    if (!Boolean(existingUserRole)) {
      return res.json({
        success: false,
        message: "User role does not exist!",
      });
    }

    res.json({
      success: true,
      message: "User role retrived successfully",
      data: existingUserRole,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * Sign up controller function
 * @param {*} req
 * @param {*} res
 */
exports.signUp = async (req, res) => {
  try {
    let newUser = await db.user.create({
      username: req.body.fullname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    });

    const roleType = req.body.role;

    const role = await db.role.findOne({
      where: {
        type: roleType,
      },
    });
    if (role && role.id === 1) {
      // role.id 1 = Lead Generator
      console.log("Current User is a Lead Generator");
    } else {
      // role.id 2 = Customer Generator
      console.log("Current User is a Customer Generator");
    }
    await newUser.setRoles(role);

    let authtoken = jwt.sign({ user: newUser }, config.secret, {
      expiresIn: "365d",
    });

    newUser = {
      newUser,
      role,
    };

    res.json({
      auth: true,
      success: "true",
      accesstoken: authtoken,
      currentuser: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: "false",
      message: "An error has occurred",
    });
  }
};

/**
 * Logs in an existing user
 * @param {*} req
 * @param {*} res
 */
exports.signIn = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: db.role,
          attributes: ["id", "type"],
          through: {
            attributes: ["userId", "roleId"],
          },
        },
      ],
    });
    if (!user) {
      return res.json({
        auth: false,
        success: false,
        message: "Your password or email is incorrect",
      });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.json({
        auth: false,
        success: false,
        message: "Your password or email is incorrect",
      });
    }

    let token = jwt.sign({ user }, config.secret, {
      expiresIn: "365d",
    });

    return res.json({
      auth: true,
      success: "true",
      accesstoken: token,
      message: "User has been successfully logged in",
      currentuser: user,
    });
  } catch (error) {
    res.json({
      auth: false,
      message: "There was a problem processing your request",
      error: error.message,
    });
  }
};

/**
 * Fetch a single user by id
 * @param {*} req
 * @param {*} res
 */
exports.fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await db.user.findOne({
      where: { id: Number(id) },
      include: [
        {
          model: db.role,
        },
      ],
    });
    if (!Boolean(existingUser)) {
      return res.json({
        success: false,
        message: "User does not exist!",
      });
    }

    res.json({
      success: true,
      message: "User retrived successfully",
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * List all users in the database
 * @param {*} req
 * @param {*} res
 */
exports.listUsers = async (req, res) => {
  try {
    let total = await db.user.count();
    const users = await db.user.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.role,
        },
      ],
    });

    res.json({
      success: true,
      message: "Fetched all users!",
      data: { users, total },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};
