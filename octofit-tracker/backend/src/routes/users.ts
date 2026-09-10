import { Router } from 'express';
import { UserModel } from '../models/user.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await UserModel.find().sort({ displayName: 1 }));
  } catch (error) {
    response.status(500).json({ error: 'Unable to load users', details: error });
  }
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await UserModel.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create user', details: error });
  }
});

export default router;
