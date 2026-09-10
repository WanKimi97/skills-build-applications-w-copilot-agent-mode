import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'jonah-williams',
        email: 'jonah.williams@example.com',
        displayName: 'Jonah Williams',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'sofia-martinez',
        email: 'sofia.martinez@example.com',
        displayName: 'Sofia Martinez',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'liam-okafor',
        email: 'liam.okafor@example.com',
        displayName: 'Liam Okafor',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
      },
    ]);

    const teams = await TeamModel.create([
      {
        name: 'Summit Striders',
        description: 'Steady progress, strong finishes, and weekend trail miles.',
        members: [users[0]._id, users[1]._id],
        points: 1840,
      },
      {
        name: 'Pulse Collective',
        description: 'A balanced crew building consistency through every workout.',
        members: [users[2]._id, users[3]._id],
        points: 1675,
      },
    ]);

    await ActivityModel.create([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 42,
        calories: 415,
        distanceKm: 6.4,
        recordedAt: new Date('2026-09-10T06:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        durationMinutes: 58,
        calories: 520,
        distanceKm: 21.7,
        recordedAt: new Date('2026-09-09T17:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 36,
        calories: 280,
        recordedAt: new Date('2026-09-10T07:10:00Z'),
      },
      {
        user: users[3]._id,
        type: 'swimming',
        durationMinutes: 45,
        calories: 390,
        distanceKm: 1.5,
        recordedAt: new Date('2026-09-08T18:00:00Z'),
      },
    ]);

    await LeaderboardModel.create([
      { user: users[0]._id, team: teams[0]._id, points: 980, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 875, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 860, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 800, rank: 4 },
    ]);

    await WorkoutModel.create([
      {
        title: 'Foundation Strength',
        description: 'A full-body strength session for building reliable movement patterns.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Dead bug', sets: 3, reps: 10 },
        ],
        tags: ['strength', 'full-body', 'foundations'],
      },
      {
        title: 'Tempo Runner',
        description: 'A focused interval workout to improve pace control and aerobic capacity.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Easy warm-up', sets: 1, reps: 1 },
          { name: 'Tempo interval', sets: 4, reps: 1 },
          { name: 'Walking recovery', sets: 4, reps: 1 },
        ],
        tags: ['running', 'cardio', 'intervals'],
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, 2 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
