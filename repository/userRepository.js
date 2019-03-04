const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const config = require('../config/index');
const tokenManager = require('../util/tokenManager');

const userRepository = {
  create(body = {}) {
    const {
      password: userPassword,
    } = body;
    const hashedPassword = bcrypt.hashSync(userPassword, config.SALT_ROUNDS, (err, hash) => {
      if (err) {
        console.log('Password Hash error', err);
      }

      return hash;
    });

    return new UserModel({
      ...body,
      password: hashedPassword,
      _id: mongoose.Types.ObjectId(),
    })
      .save()
      .then(user => tokenManager.createToken(user));
  },

  async findExistingUser(req, res, next) {
    try {
      return await UserModel.findOne({ email: req.body.email });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userRepository;
