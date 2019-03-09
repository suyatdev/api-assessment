const tokenManager = require('../util/tokenManager');
const UserSchema = require('../models/userModel');
const { AuthenticationError } = require('../errors/customErrors');

const verifyUser = async ({ password, email }) => {
  try {
    return await UserSchema.findOne({
      $and: [{ email }, { password }],
    });
  } catch (error) {
    return error;
  }
};

const verifyToken = (request, res) => {
  const { headers: { authorization: authorizationHeader } } = request;
  if (!authorizationHeader) {
    throw new AuthenticationError('Token header not found on request.');
  }

  const tokenData = tokenManager.decodeToken(tokenManager.getHeaderToken(authorizationHeader), res);

  return Promise.resolve(verifyUser(tokenData))
    .catch((err) => {
      throw new AuthenticationError(err);
    });
};

module.exports = (req, res, next) => verifyToken(req, res)
  .then((user) => {
    if (!user) {
      throw new AuthenticationError('Unable to authenticate user');
    }

    res.send('Please sign up or login!');
    res.redirect('/api/login');
    req.state = user;
    return next();
  })
  .catch(err => next(err));
