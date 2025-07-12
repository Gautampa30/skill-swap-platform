import express from 'express';
import User from '../models/User.js';
import Swap from '../models/Swap.js';
import Feedback from '../models/Feedback.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create a new swap request (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, skillsOffered, skillsWanted, message } = req.body;
    if (!receiverId || !skillsOffered || !skillsWanted) return res.status(400).json({ error: 'Missing fields' });
    const swap = await Swap.create({
      requester: req.user.userId,
      receiver: receiverId,
      skillsOffered,
      skillsWanted,
      message,
      status: 'pending',
    });
    res.status(201).json(swap);
  } catch (err) {
    console.error('Failed to create swap:', err);
    res.status(500).json({ error: 'Failed to create swap' });
  }
});

// Get all swaps involving current user (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const swaps = await Swap.find({ $or: [ { requester: userId }, { receiver: userId } ] })
      .populate('requester receiver', 'name email');
    res.json(swaps);
  } catch (err) {
    console.error('Failed to fetch swaps:', err);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

// Update swap status (accept/reject/delete) (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { action } = req.body; // 'accept', 'reject', or 'delete'
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });
    
    // Check authorization
    const isRequester = swap.requester.toString() === req.user.userId;
    const isReceiver = swap.receiver.toString() === req.user.userId;
    
    if (!isRequester && !isReceiver) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Handle different actions
    if (action === 'delete') {
      if (!isRequester) return res.status(403).json({ error: 'Only requester can delete' });
      if (swap.status === 'accepted') return res.status(400).json({ error: 'Cannot delete accepted swap' });
      await swap.deleteOne();
      return res.json({ success: true });
    }
    
    if (action === 'accept' || action === 'reject') {
      if (!isReceiver) return res.status(403).json({ error: 'Only receiver can accept/reject' });
      if (swap.status !== 'pending') return res.status(400).json({ error: 'Swap already responded to' });
      swap.status = action === 'accept' ? 'accepted' : 'rejected';
      await swap.save();
      return res.json(swap);
    }
    
    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Failed to update swap:', err);
    res.status(500).json({ error: 'Failed to update swap' });
  }
});

// Submit feedback after swap (protected)
router.post('/:id/feedback', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });
    
    // Only participants can leave feedback
    if (![swap.requester.toString(), swap.receiver.toString()].includes(req.user.userId))
      return res.status(403).json({ error: 'Not authorized' });
    
    if (swap.status !== 'accepted') return res.status(400).json({ error: 'Swap not completed' });
    
    // Only one feedback per swap per user
    const existing = await Feedback.findOne({ swap: swap._id, user: req.user.userId });
    if (existing) return res.status(400).json({ error: 'Feedback already submitted' });
    
    const feedback = await Feedback.create({
      swap: swap._id,
      user: req.user.userId,
      rating,
      comment,
    });
    
    swap.feedback = feedback._id;
    await swap.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Failed to submit feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Admin auth middleware
function adminMiddleware(req, res, next) {
  auth(req, res, () => {
    if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
    next();
  });
}

// Get all users (admin)
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Ban/unban user (admin)
router.put('/users/:id/ban', adminMiddleware, async (req, res) => {
  try {
    const { ban } = req.body; // true or false
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: ban }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Failed to update user (ban):', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Approve/reject skills (set isPublic) (admin)
router.put('/users/:id/privacy', adminMiddleware, async (req, res) => {
  try {
    const { isPublic } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isPublic }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Failed to update privacy:', err);
    res.status(500).json({ error: 'Failed to update privacy' });
  }
});

// Get all swaps (admin)
router.get('/swaps', adminMiddleware, async (req, res) => {
  try {
    const swaps = await Swap.find().populate('requester receiver', 'name email');
    res.json(swaps);
  } catch (err) {
    console.error('Failed to fetch swaps (admin):', err);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

// Get all feedback (admin)
router.get('/feedback', adminMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email');
    res.json(feedbacks);
  } catch (err) {
    console.error('Failed to fetch feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Send platform-wide message (admin)
router.post('/message', adminMiddleware, (req, res) => {
  try {
    // In a real app, this would send notifications/emails
    res.json({ message: 'Platform-wide message sent (dummy endpoint)' });
  } catch (err) {
    console.error('Failed to send platform-wide message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Download reports (admin)
router.get('/report', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const swaps = await Swap.find();
    const feedbacks = await Feedback.find();
    res.json({ users, swaps, feedbacks });
  } catch (err) {
    console.error('Failed to generate report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
