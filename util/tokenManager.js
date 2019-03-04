const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');


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
};
