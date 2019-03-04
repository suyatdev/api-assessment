const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const config = require('../config/index');

const userRepository = {
  create(body = {}) {
    const {
      password: userPassword,
    } = body;
    const hashedPassword = bcrypt.hashSync(userPassword, 10, (err, hash) => {
      if (err) {
        console.log('Password Hash error', err);
      } else {
        return hash;
      }
    });

    return new UserModel({
      ...body,
      password: hashedPassword,
      _id: mongoose.Types.ObjectId(),
    })
      .save()
      .then((user) => {
        const { email, password } = user;
        const token = jwt.sign({ email, password }, config.SECRET, { expiresIn: `${config.TOKEN_LIFE}` });

        return { user, token };
      });
  },

  async findExistingUser(req, res, next) {
    try {
      return await UserModel.find({ email: req.body.emal });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userRepository;
