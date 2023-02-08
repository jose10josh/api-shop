const express = require('express');
const passport = require('passport');


const authService = require('../services/auth.service');
const service = new authService();


const router = express.Router();


/**
 * @swagger
 * /api/v1/login:
 *  get:
 *    tags:
 *      - Auth
 *    description: Validate user and password
 *    responses:
 *      '200':
 *        description: Return user and token
*/
router.get('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = service.signToken(user);
      res.json({user, token});
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/recover-password:
 *  get:
 *    tags:
 *      - Auth
 *    description: Send recover password email
 *    responses:
 *      '200':
 *        description: Return success message
*/
router.get('/recover-password',
  async (req, res, next) => {
    try {
      const {email} = req.body;
      const resp = await service.sendMail(email);

      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * /api/v1/reset-password:
 *  get:
 *    tags:
 *      - Auth
 *    description: Reset user password
 *    responses:
 *      '200':
 *        description: Return success message
*/
router.get('/reset-password',
  async (req, res, next) => {
    try {
      const {token, newPassword} = req.body;
      const resp = await service.resetPassword(token, newPassword);

      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);
