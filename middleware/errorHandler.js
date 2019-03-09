const createErrorJSON = (code, message) => ({
  message,
  code,
});
const parseError = (error) => {
  if (error.code && error.message) {
    return createErrorJSON(error.code, error.message);
  }

  return createErrorJSON(error.status || 500, error.message || 'Internal server error');
};

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const parsedError = parseError(err);
  return res.status(parsedError.code).send({ error: parsedError });
};
