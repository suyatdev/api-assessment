const UserRouter = (require('express')).Router();
const UserController = require('../controller/userController');

/**
 * @api {post} /api/user
 * @apiDescription Create a new user
 *
 * @param {Object} body - (Request body) New user information.
 * @param {String} body.first_name
 * @param {String} body.last_name
 * @param {String} body.email
 * @param {String} body.password
 * @param {String} body.confirm_password
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK Success
 *     {
 *        "message": "Success",
 *        "success": true,
 *        "user": {
 *           "email": "ryanwilliams@gmail.com",
 *           "first_name": "Ryan",
 *           "last_name": "Williams",
 *           "password": "$2a$10$TxnoaJv1Xup/SuJlbzzhfuYeFBEu.Skm0Y.ClFQkI1fGjELGLH7By",
 *           "_id": "5c906e47c28b2a87fea5c1d9",
 *           "__v": 0
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *    }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessible Entity
 *     {
 *       "error": {
 *         "message": "Password does not match",
 *         "code": 422
 *        }
 *     }
 *     HTTP/1.1 422 Unprocessible Entity
 *     {
 *       "error": {
 *         "message": "Email is invalid",
 *         "code": 422
 *       }
 *     }
 */
UserRouter.route('/').post(UserController.createNewUser);

module.exports = UserRouter;
