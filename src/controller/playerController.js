const PlayerRepository = require('../repository/playerRepository');
const { NotFoundError } = require('../util/customErrorHandling');

module.exports = {

  async createPlayer(req, res, next) {
    try {
      const player = await PlayerRepository.createPlayer(req);

      const response = {
        message: 'Success',
        success: true,
        player,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
  async getAllPlayers(req, res, next) {
    try {
      const players = await PlayerRepository.getAllPlayers(req);
      const response = {
        message: 'Success',
        success: true,
        players,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
  async deletePlayer(req, res, next) {
    try {
      const player = await PlayerRepository.findOnePlayer(req.params);
      if (player.length === 0) throw new NotFoundError(`Player ${req.params.id}`);

      await PlayerRepository.deleteOnePlayer(req.params);

      const response = {
        message: `Deleted player ${req.params.id} Success`,
        success: true,
      };

      res.set('Content-Type', 'application/json');
      res.status(200).json(response);

      return next();
    } catch (err) {
      return next(err);
    }
  },
};
