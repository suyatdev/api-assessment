const validator = require('validator');

class ValidationError extends Error {
  constructor({ message, status, code }) {
    super();
    this.status = status || 400;
    this.code = code || 400;
    this.message = `ERROR: ${message}`;
  }
}
class InvalidEmailError extends ValidationError {
  constructor() {
    super();
    this.message = 'Email is invalid';
    this.status = 422;
    this.code = 422;
  }
}

class PasswordMatchError extends ValidationError {
  constructor() {
    super();
    this.message = 'Password does not match';
    this.status = 422;
    this.code = 422;
  }
}

const validation = (req, res, next) => {
  const matchingPassword = req.body.password === req.body.confirm_password;
  const isEmailValid = validator.isEmail(req.body.email);

  if (!matchingPassword) throw new PasswordMatchError();
  if (!isEmailValid) throw new InvalidEmailError();

  next();
};

module.exports = validation;
