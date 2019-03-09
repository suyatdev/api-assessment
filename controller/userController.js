const UserRepository = require('../repository/userRepository');
const { EmailError } = require('../errors/customErrors');

const userController = {
  async createNewUser(req, res, next) {
    try {
      const existingUser = await UserRepository.findExistingUser(req);

      if (existingUser) throw new EmailError('Email is taken!');

      const { user, token } = await UserRepository.create(req.body);

      const response = {
        message: 'Success',
        success: true,
        user,
        token,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
