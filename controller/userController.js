const UserRepository = require('../repository/userRepository');

const userController = {
  async createNewUser(req, res, next) {
    try {
      const isNewUser = await UserRepository.findExistingUser(req, res, next);

      if (isNewUser.length >= 1) res.status(409).json({ message: 'Email is taken' });

      const { user, token } = await UserRepository.create(req.body);

      const response = {
        message: 'Success',
        success: true,
        user,
        token,
      };

      console.log('NEW USER CREATED', response);
      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
