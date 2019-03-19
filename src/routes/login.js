const LoginRouter = (require('express')).Router();
const UserController = require('../controller/userController');

/**
 * @api {post} /api/login
 * @apiDescription User login
 *
 * @param {Object} body - (Request body) New user information.
 * @param {String} body.email
 * @param {String} body.password
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
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *         "message": "UNAUTHORIZED: Unable to authenticate user",
 *         "code": 401
 *        }
 *     }
 */
LoginRouter.route('/').post(UserController.findUser);

module.exports = LoginRouter;
