import { Router } from 'express';
import { WorkoutModel } from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await WorkoutModel.find().sort({ difficulty: 1, title: 1 }));
  } catch (error) {
    response.status(500).json({ error: 'Unable to load workouts', details: error });
  }
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await WorkoutModel.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create workout', details: error });
  }
});

export default router;
