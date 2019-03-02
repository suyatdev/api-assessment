const UserRouter = (require('express')).Router();
// const UserController = require('../controller/userController');
const UserRepository = require('../repository/userRepository');

UserRouter.route('/').post(UserRepository.create);

module.exports = UserRouter;
