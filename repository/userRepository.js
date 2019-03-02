
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');


const checkIfNewUser = (email) => {
  UserModel.find({ email })
    .exec()
    .then((user) => {
      console.log('user exist', user);
    })
    .catch();
};

const userRepository = {
  create(req) {
    const { body } = req;
    console.log('%c BODY', 'color: green', body) // eslint-disable-line
    checkIfNewUser(body.email);
    // new UserModel({
    //   ...body,
    //   _id: mongoose.Types.ObjectId(),
    // })
    //   .save((err) => {
    //     if (err) {
    //       console.log('Save Error',err ) // eslint-disable-line
    //     }
    //   })
    //   .then();

    return {};
  },
};

module.exports = userRepository;
