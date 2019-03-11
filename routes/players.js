const PlayerRouter = (require('express')).Router();
const PlayerController = require('../controller/playerController');

PlayerRouter.route('/').get(PlayerController.getAllPlayers);

PlayerRouter.route('/').post(PlayerController.createPlayer);

PlayerRouter.route('/:id').delete(PlayerController.deletePlayer);

module.exports = PlayerRouter;
