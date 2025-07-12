import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  photoUrl: String,
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
  availability: String, // comma-separated
  skillsOffered: [SkillSchema],
  skillsWanted: [SkillSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
