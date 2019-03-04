const tokenManager = require('../util/tokenManager');
const UserSchema = require('../models/userModel');

class AuthenticationError extends Error {
  constructor() {
    super();
    this.status = 401;
    this.code = 401;
    this.message = 'UNAUTHORIZED: Unable to authenticate user';
  }
}

class TokenHeaderNotFoundError extends AuthenticationError {
  constructor() {
    super();
    this.message = 'UNAUTHORIZED: Token header not found on request.';
  }
}

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
    res.send({ error: new TokenHeaderNotFoundError() });
  }

  const tokenData = tokenManager.decodeToken(tokenManager.getHeaderToken(authorizationHeader), res);

  return Promise.resolve(verifyUser(tokenData))
    .catch((err) => {
      res.send({ error: new AuthenticationError(err) });
    });
};

module.exports = (req, res, next) => verifyToken(req, res)
  .then((user) => {
    if (!user) {
      res.send({ error: new AuthenticationError() });
    }

    req.state = user;
    return next();
  })
  .catch(err => err);
