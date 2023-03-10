const express = require('express');
const passport = require('passport');

const UserService = require('../services/user.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const {checkUserRole} = require('../middlewares/auth.handler.js');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema.js');


const router = express.Router();
const service = new UserService();


/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    tags:
 *      - Users
 *    description: Return all users
 *    responses:
 *      '200':
 *        description: An array of users
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [
 *                {
 *                  "id": 3,
 *                  "email": "test@correo.com",
 *                  "password": "123123123",
 *                }
 *               ]
 */
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkUserRole("admin"),
  async (req, res, next) => {
    try {
      const resp = await service.find();
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    description: Return a single user
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the user to retrieve
 *    responses:
 *      '200':
 *        description: Return a single user object
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {
 *                  "id": 3,
 *                  "email": "test@correo.com",
 *                  "password": "123123123",
 *                }
 *      '404':
 *        description: User not found
 */
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkUserRole("admin"),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.findOne(id);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
)

router.get('/profile',
  passport.authenticate('jwt', {session: false}),
  checkUserRole("admin", "customer"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const resp = await service.findOne(user.sub);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    tags:
 *      - Users
 *    description: Create a new user
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "email": "user@email.com",
 *                "password": "user_password",
 *                "roleId": 1
 *            }
 *    responses:
 *      '201':
 *        description: Return the created user object
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {
 *                "id": 1,
 *                "email": "user@email.com",
 *                "password": "user_password"
 *               }
 *      '400':
 *        description: Return a object with the error message
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               example: {
 *                "statusCode": 400,
 *                "error": "Bad Request",
 *                "message": "\"role\" is required"
 *               }
 */
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const resp = await service.create(body);
      res.status(201).json(resp)
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    tags:
 *      - Users
 *    description: Update an existing user
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the user to update
 *    requestBody:
 *      content:
 *        "application/json":
 *          schema:
 *            type: object
 *            example: {
 *                "email": "user@email.com",
 *                "password": "user_password",
 *                "roleId": 1
 *            }
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: User not found
 */
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const resp = await service.update(id, body);
      res.status(200).json(resp)
    } catch (error) {
      next(error);
    }
  }
)

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    tags:
 *      - Users
 *    description: Delete an existing user
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: "integer"
 *         required: true
 *         description: ID of the user to deletes
 *    responses:
 *      '200':
 *        description: Return a success message
 *      '404':
 *        description: User not found
 */
router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.delete(id);
      res.status(200).json(resp)
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
