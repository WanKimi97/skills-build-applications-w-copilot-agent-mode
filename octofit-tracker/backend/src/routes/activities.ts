import { Router } from 'express';
import { ActivityModel } from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await ActivityModel.find().populate('user', 'displayName username').sort({ recordedAt: -1 }));
  } catch (error) {
    response.status(500).json({ error: 'Unable to load activities', details: error });
  }
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await ActivityModel.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create activity', details: error });
  }
});

export default router;
