const validator = require('validator');
const { ValidationError } = require('../errors/customErrors');

const validation = (req, res, next) => {
  const matchingPassword = req.body.password === req.body.confirm_password;
  const isEmailValid = validator.isEmail(req.body.email);

  if (!matchingPassword) {
    throw new ValidationError('Password does not match');
  }
  if (!isEmailValid) {
    throw new ValidationError('Email is invalid');
  }

  next();
};

module.exports = validation;
