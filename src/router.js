const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const playersRouter = require('./routes/players');

const ValidationMiddleware = require('./middleware/validation');
const userAuthMiddleWare = require('./middleware/userAuth');
const errorMiddleWare = require('./middleware/errorHandler');

module.exports = function router(app) {
  // for test use and checking over all server status
  app.use('/test', (req, res) => {
    res.status(200).send('Running fine!');
  });

  // Admin
  app.use('/api/user', ValidationMiddleware, userRouter);

  // Login
  app.use('/api/login', loginRouter);

  // Player
  // Authenticate user before any request on this route
  app.use('/api/players', userAuthMiddleWare, playersRouter);


  // catch all errors
  app.use(errorMiddleWare);
};
