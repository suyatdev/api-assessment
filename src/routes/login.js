const LoginRouter = (require('express')).Router();
const UserController = require('../controller/userController');

LoginRouter.route('/').post(UserController.findUser);

module.exports = LoginRouter;
