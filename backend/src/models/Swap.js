import mongoose from 'mongoose';

const SwapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillsOffered: String,
  skillsWanted: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'deleted'], default: 'pending' },
  message: String,
  feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Swap', SwapSchema);
