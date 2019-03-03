const UserRouter = (require('express')).Router();
const UserController = require('../controller/userController');

UserRouter.route('/').post(UserController.createNewUser);

module.exports = UserRouter;
