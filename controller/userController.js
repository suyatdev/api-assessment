const UserRepository = require('../repository/userRepository');

const userController = {
  create(req, res, next) {
    return UserRepository.create(req)
      .then((body) => {
        req.state = { body, payload: body };
        return next();
      })
      .catch(err => next(err));
  },

};

module.export = userController;
