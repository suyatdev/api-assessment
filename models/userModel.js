const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Shema.Types.ObjectId,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
