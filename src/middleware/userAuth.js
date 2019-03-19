const tokenManager = require('../util/tokenManager');
const { AuthenticationError } = require('../util/customErrorHandling');

/**
 * Checks to see if the header token is valid
 * and if a user exist in the database with matching token
 */

module.exports = (req, res, next) => tokenManager.verifyToken(req, res)
  .then((user) => {
    if (!user) {
      throw new AuthenticationError('Unable to authenticate user');
    }

    req.user = user;
    return next();
  })
  .catch((err) => {
    next(err);
  });
