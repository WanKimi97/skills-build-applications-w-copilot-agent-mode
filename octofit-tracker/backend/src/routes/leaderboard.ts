import { Router } from 'express';
import { LeaderboardModel } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    response.json(await LeaderboardModel.find().populate('user', 'displayName username').populate('team', 'name').sort({ rank: 1 }));
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error });
  }
});

export default router;
