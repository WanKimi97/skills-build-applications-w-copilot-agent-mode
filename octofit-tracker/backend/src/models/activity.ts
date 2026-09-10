import mongoose, { type HydratedDocument, type InferSchemaType } from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'strength', 'swimming', 'walking'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    recordedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
export type ActivityDocument = HydratedDocument<Activity>;
export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
