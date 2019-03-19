const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserSchema = require('../models/userModel');
const { AuthenticationError } = require('./customErrorHandling');

module.exports = {

  /**
   *  Verifies a token and returns the user object
   * @param {string} credential
   * @param {object} response
   * @returns {object}
   */
  decodeToken(credentials, res) {
    return jwt.verify(credentials, config.SECRET, (error, validResult) => {
      if (error) {
        res.status(401).json({ error });
      }

      return validResult;
    });
  },

  /**
   *  Creates a token for a user
   * @param {Object} user
   * @returns {object} the user object with the generated token
   */
  createToken(user) {
    const { email, password } = user;
    const token = jwt.sign({ email, password }, config.SECRET, { expiresIn: `${config.TOKEN_LIFE}` });

    return { user, token };
  },

  /**
   *  Pulls the token string from the header
   * @param {String} authorizationHeader
   * @returns {String} the token
   */
  getHeaderToken(authorizationHeader) {
    return _.last(authorizationHeader.split(' '));
  },

  /**
   *  Finds the user with the matching email and password
   *  and returns the matching user
   * @param {String} password
   * @param {String} email
   * @returns {Object}
   */
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

  /**
   *  Returns a Promise object
   * @param {Object} password
   * @param {Object} email
   * @returns {Promise} A Promise user object that matches the validated token
   */
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
