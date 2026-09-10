import mongoose, { type HydratedDocument, type InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export type TeamDocument = HydratedDocument<Team>;
export const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema);
