const bcrypt = require('bcryptjs');
const UserRepository = require('../repository/userRepository');
const { EmailError, AuthenticationError } = require('../util/customErrorHandling');
const config = require('../config/index');
const { createToken } = require('../util/tokenManager');

const hashPassword = ({ password }) => bcrypt.hashSync(password, config.SALT_ROUNDS, (err, hash) => {
  if (err) {
    throw new Error(err);
  }
  return hash;
});

const comparePassword = (password, hash) => bcrypt.compare(password, hash).then(res => res).catch(err => err);

const checkExistingUser = req => UserRepository.findExistingUser(req);

/**
 * Manages the responses and request for users
 */
module.exports = {

  async createNewUser(req, res, next) {
    try {
      const { body } = req;
      const hashedPassword = await hashPassword(body);
      const existingUser = await checkExistingUser(req);

      if (existingUser) throw new EmailError('Email is taken');

      const { user, token } = await UserRepository.create({ body, hashedPassword });

      const response = {
        message: 'Success',
        success: true,
        user,
        token,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
  async findUser(req, res, next) {
    try {
      const { body } = req;
      const existingUser = await checkExistingUser(req);
      let verifiedPassword = null;

      if (existingUser) {
        verifiedPassword = await comparePassword(body.password, existingUser.password);
      }
      if (!verifiedPassword) throw new AuthenticationError('Unable to authenticate user');

      const { user, token } = await createToken(existingUser);

      const response = {
        message: 'Success',
        success: true,
        user,
        token,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
};
