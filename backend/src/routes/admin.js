import express from 'express';
import User from '../models/User.js';
import Swap from '../models/Swap.js';
import Feedback from '../models/Feedback.js';
import jwt from 'jsonwebtoken';
import { Parser } from 'json2csv';

const router = express.Router();

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Moderate skills (list, ban/unban users, reject skills)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.patch('/users/:id/ban', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

router.patch('/users/:id/unban', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to unban user' });
  }
});

// Monitor swaps
router.get('/swaps', adminAuth, async (req, res) => {
  try {
    const swaps = await Swap.find().populate('requester').populate('receiver');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

// Platform-wide announcements (placeholder)
router.post('/announce', adminAuth, async (req, res) => {
  try {
    // Store or broadcast announcement (implementation depends on frontend)
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send announcement' });
  }
});

// Download reports (CSV export)
router.get('/report/:type', adminAuth, async (req, res) => {
  try {
    let data;
    if (req.params.type === 'users') {
      data = await User.find();
    } else if (req.params.type === 'swaps') {
      data = await Swap.find();
    } else if (req.params.type === 'feedback') {
      data = await Feedback.find();
    } else {
      return res.status(400).json({ error: 'Invalid report type' });
    }
    const parser = new Parser();
    const csv = parser.parse(data.map(d => d.toObject ? d.toObject() : d));
    res.header('Content-Type', 'text/csv');
    res.attachment(`${req.params.type}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
