const usersRouter = require('./routes/user');
const validationMiddleware = require('./middleware/validation');

module.exports = function router(app) {
  // Admin
  app.use('/api/user', validationMiddleware, usersRouter);

  // Login
  app.use('/api/login', (req, res) => res.status(200).send('Login page'));

  // Player
  app.use('/api/players', (req, res) => res.status(200).send('Player list'));
};
