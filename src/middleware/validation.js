const validator = require('validator');
const { ValidationError } = require('../util/customErrorHandling');

/**
 * Validate the email
 * and checks if password matches
 */

module.exports = (req, res, next) => {
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
