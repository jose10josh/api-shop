const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {config} = require('../config/config');


const router = express.Router();


/**
 * @swagger
 * /api/v1/login:
 *  get:
 *    tags:
 *      - Login
 *    description: Validate user and password
 *    responses:
 *      '200':
 *        description: An array of categories
*/
router.get('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.jwtSecret);

      res.json({user, token});
    } catch (error) {
      next(error);
    }
  }
);
