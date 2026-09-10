import mongoose, { type HydratedDocument, type InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: Number, required: true, min: 1 },
      },
    ],
    tags: [{ type: String }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export type WorkoutDocument = HydratedDocument<Workout>;
export const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
