const usersRouter = require('./routes/user');
const validationMiddleware = require('./middleware/validation');
const userAuthMiddleWare = require('./middleware/userAuth');

module.exports = function router(app) {
  // for test use and checking over all server status
  app.use('/test', (req, res) => {
    res.status(200).send('Running fine!');
  });

  // Admin
  app.use('/api/user', validationMiddleware, usersRouter);

  // Login
  app.use('/api/login', (req, res) => res.status(200).send('Login page'));

  // Player
  // Authenticate user before any request on this route
  app.use('/api/players/:id', userAuthMiddleWare, (req, res) => {
    console.log('req.state', req.state);
    console.log('req.body', req.body);
    console.log('req.params', req.params.id);
    console.log('req.query', req.query);


    res.status(200).send({});
  });
};
