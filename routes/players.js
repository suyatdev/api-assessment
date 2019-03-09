const PlayerRouter = (require('express')).Router();
const PlayerController = require('../controller/playerController');

PlayerRouter.route('/').get(PlayerController);

PlayerRouter.route('/:id').post(PlayerController);

module.exports = PlayerRouter;
