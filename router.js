
module.exports = function router(app) {
  app.use('/healthcheck', (req, res) => {
    res.status(200).send('It\'s Ok!');
  });

  // Admin
  app.use('/api/user', (req, res) => res.status(200).send('Admin sign up'));

  // Login
  app.use('/api/login', (req, res) => res.status(200).send('Login page'));

  // Player
  app.use('/api/players', (req, res) => res.status(200).send('Player list'));
};
