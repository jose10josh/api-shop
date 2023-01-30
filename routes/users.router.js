import express from 'express';
import UserService from '../services/user.service.js';

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
 *                  "createdAt": "2022-12-12T10:11:22.000Z"
 *                }
 *               ]
 */
router.get('/', async (req, res) => {
  const resp = await service.find();
  res.json(resp);
})

export default router;
