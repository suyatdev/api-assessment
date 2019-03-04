const validator = require('validator');

class InvalidError extends Error {
  constructor(message) {
    super();
    this.status = 422;
    this.code = 422;
    this.message = message;
  }
}

const validation = (req, res, next) => {
  const matchingPassword = req.body.password === req.body.confirm_password;
  const isEmailValid = validator.isEmail(req.body.email);

  if (!matchingPassword) {
    return res.status(422).send(new InvalidError('Password does not match'));
  }
  if (!isEmailValid) {
    return res.status(422).send(new InvalidError('Email is invalid'));
  }

  next();
};

module.exports = validation;
