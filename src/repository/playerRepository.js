const mongoose = require('mongoose');
const PlayerModel = require('../models/playerModel');

/**
 * Interface with Playermodel
 *
 */
module.exports = {
  async createPlayer({ user, body }) {
    try {
      return await new PlayerModel({
        ...body,
        owner_id: user._id,
        _id: mongoose.Types.ObjectId(),
      })
        .save();
    } catch (err) {
      throw new Error(err);
    }
  },

  async getAllPlayers({ user }) {
    try {
      return PlayerModel.find({
        owner_id: user._id,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteOnePlayer({ id }) {
    try {
      await PlayerModel.remove({
        _id: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async findOnePlayer({ id }) {
    try {
      return await PlayerModel.find({
        _id: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
