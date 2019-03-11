const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserSchema = require('../models/userModel');
const { AuthenticationError } = require('../errors/customErrors');

module.exports = {
  decodeToken(credentials, res) {
    return jwt.verify(credentials, config.SECRET, (error, validResult) => {
      if (error) {
        res.status(401).json({ error });
      }

      return validResult;
    });
  },
  createToken(user) {
    const { email, password } = user;
    const token = jwt.sign({ email, password }, config.SECRET, { expiresIn: `${config.TOKEN_LIFE}` });

    return { user, token };
  },
  getHeaderToken(authorizationHeader) {
    return _.last(authorizationHeader.split(' '));
  },
  async verifyUser({
    password,
    email,
  }) {
    try {
      return await UserSchema.findOne({
        $and: [{
          email,
        }, {
          password,
        }],
      });
    } catch (error) {
      return error;
    }
  },
  verifyToken(request, res) {
    const {
      headers: {
        authorization: authorizationHeader,
      },
    } = request;
    if (!authorizationHeader) {
      throw new AuthenticationError('Token header not found on request');
    }

    const tokenData = this.decodeToken(this.getHeaderToken(authorizationHeader), res);

    return Promise.resolve(this.verifyUser(tokenData))
      .catch((err) => {
        throw new AuthenticationError(err);
      });
  },

};
