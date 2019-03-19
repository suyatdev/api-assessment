const PlayerRouter = (require('express')).Router();
const PlayerController = require('../controller/playerController');

/**
 * @api {get} /api/players
 * @apiDescription List all players for user
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept": "application/json",
 *       "Content-Type": "application/json",
 *       "Authorization": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK Success
 *     {
 *        "message": "Success",
 *        "success": true,
 *        "players": [{
 *            "handedness": "left",
 *            "_id": "5c90756f2f5f359216435284",
 *            "first_name": "Player1",
 *            "last_name": "S",
 *            "rating": 123549,
 *            "owner_id": "5c906c4122ff3c84766d83d3",
 *            "__v": 0
 *       }],
 *    }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *         "message": "UNAUTHORIZED: Token header not found on request",
 *         "code": 401
 *        }
 *     }
 */
PlayerRouter.route('/').get(PlayerController.getAllPlayers);

PlayerRouter.route('/').post(PlayerController.createPlayer);

/**
 * @api {delete} /api/players/:id Players unique id.
 * @apiDescription Create a player
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept": "application/json",
 *       "Content-Type": "application/json",
 *       "Authorization": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK Success
 *     {
 *        "message": "Deleted player 5c9076a2658e08937ecaf8ea Success",
 *        "success": true,
 *    }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *         "message": "UNAUTHORIZED: Token header not found on request",
 *         "code": 401
 *        }
 *     }
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": {
 *         "message": "Player 5c8ed85f50ca1d7f3ba0e29e not found",
 *         "code": 404
 *        }
 *     }
 */
PlayerRouter.route('/:id').delete(PlayerController.deletePlayer);

module.exports = PlayerRouter;
