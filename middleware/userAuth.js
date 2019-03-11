const tokenManager = require('../util/tokenManager');
const { AuthenticationError } = require('../errors/customErrors');

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
