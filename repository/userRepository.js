const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const config = require('../config/index');

const userRepository = {
  create(body = {}) {
    const {
      password,
    } = body;
    const hashedPassword = bcrypt.hashSync(password, 10, (err, hash) => {
      if (err) {
        console.log('Hash error', err);
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
        const { email, _id } = user;
        const token = jwt.sign({ email, _id }, config.SECRET, { expiresIn: `${config.TOKEN_LIFE}` });

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
