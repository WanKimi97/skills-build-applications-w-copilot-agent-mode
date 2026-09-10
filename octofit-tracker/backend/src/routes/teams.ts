import { Router } from 'express';
import { TeamModel } from '../models/team.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await TeamModel.find().populate('members', 'displayName username').sort({ points: -1 }));
  } catch (error) {
    response.status(500).json({ error: 'Unable to load teams', details: error });
  }
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await TeamModel.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create team', details: error });
  }
});

export default router;
