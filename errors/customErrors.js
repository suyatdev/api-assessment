class EmailError extends Error {
  constructor(message) {
    super();
    this.status = 422;
    this.code = 422;
    this.message = message;
  }
}

class ValidationError extends EmailError {
  constructor(message) {
    super();
    this.message = message;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.status = 401;
    this.code = 401;
    this.message = `UNAUTHORIZED: ${message}`;
  }
}

module.exports = {
  EmailError,
  ValidationError,
  AuthenticationError,
};
