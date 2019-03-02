const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  rating: { type: Number, required: true },
  handedness: { type: String, enum: ['left', 'right'], default: 'right' },
});

module.exports = mongoose.model('Player', playerSchema);
