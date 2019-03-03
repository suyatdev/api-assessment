const validator = require('validator');

class ErrorMessage extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const validation = (req, res, next) => {
  const matchingPassword = req.body.password === req.body.confirm_password;
  const isEmailValid = validator.isEmail(req.body.email);

  if (!matchingPassword) throw new ErrorMessage('Password does not match');
  if (!isEmailValid) throw new ErrorMessage('Email is invalid');

  next();
};

module.exports = validation;
