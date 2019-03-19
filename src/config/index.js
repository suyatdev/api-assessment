const develop = require('./env/develop');
const local = require('./env/local');

module.exports = {
  develop,
  local,
}[process.env.NODE_ENV];
