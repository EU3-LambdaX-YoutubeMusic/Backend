const bcrypt = require('bcryptjs')
const Users = require("./users.models");
const AuthHelper = require("./auth");
const Validation = require("./userValidation");

const { genSaltSync, hashSync } = bcrypt;

const register = async (req, res) => {
  try {
    const { error } = Validation.validateUser(req.body);

    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    console.log(existingUser)

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "user already exist",
      });
    }
    // Insert a new user
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: hash,
    });

    await user.save();

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      user: AuthHelper.Auth.toAuthJSON(user),
    });
  } 
    catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};


module.exports = { register };