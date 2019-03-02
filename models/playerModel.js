const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  rating: { type: Number, required: true },
  handedness: { type: String, enum: ['left', 'right'] },
});

module.exports = mongoose.model('User', userSchema);
