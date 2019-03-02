const local = require('./env/local');
const test = require('./env/test');

module.exports = {
  local,
  test,
}[process.env.NODE_ENV];
