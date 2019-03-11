const mongoose = require('mongoose');
const UserModel = require('../models/userModel');

const tokenManager = require('../util/tokenManager');

const userRepository = {
  async create({ body, hashedPassword }) {
    try {
      const { email, first_name, last_name } = body; // eslint-disable-line
      const newUser = await new UserModel({
        email,
        first_name,
        last_name,
        password: hashedPassword,
        _id: mongoose.Types.ObjectId(),
      })
        .save();

      return await tokenManager.createToken(newUser);
    } catch (err) {
      return err;
    }
  },

  async findExistingUser(req) {
    try {
      return await UserModel.findOne({ email: req.body.email });
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = userRepository;
