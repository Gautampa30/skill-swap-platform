import express from 'express';
import User from '../models/User.js';
import Swap from '../models/Swap.js';
import Feedback from '../models/Feedback.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get current user's profile (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update current user's profile (protected)
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Prevent password change here
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Failed to update profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Add a skill to "offered" list (protected)
router.post('/me/skills-offered', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Check if skill already exists
    const existingSkill = user.skillsOffered.find(skill => skill.name === name);
    if (existingSkill) return res.status(400).json({ error: 'Skill already exists' });
    
    user.skillsOffered.push({ name });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Failed to add skill (offered):', err);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// Remove a skill from "offered" list (protected)
router.delete('/me/skills-offered', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.skillsOffered = user.skillsOffered.filter(skill => skill.name !== name);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Failed to remove skill (offered):', err);
    res.status(500).json({ error: 'Failed to remove skill' });
  }
});

// Add a skill to "wanted" list (protected)
router.post('/me/skills-wanted', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Check if skill already exists
    const existingSkill = user.skillsWanted.find(skill => skill.name === name);
    if (existingSkill) return res.status(400).json({ error: 'Skill already exists' });
    
    user.skillsWanted.push({ name });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Failed to add skill (wanted):', err);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// Remove a skill from "wanted" list (protected)
router.delete('/me/skills-wanted', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.skillsWanted = user.skillsWanted.filter(skill => skill.name !== name);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Failed to remove skill (wanted):', err);
    res.status(500).json({ error: 'Failed to remove skill' });
  }
});

// Update user's availability (protected)
router.put('/me/availability', auth, async (req, res) => {
  try {
    const { availability } = req.body;
    if (!availability) return res.status(400).json({ error: 'Availability is required' });
    const user = await User.findByIdAndUpdate(
      req.user.userId, 
      { availability }, 
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Failed to update availability:', err);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Set profile as public/private (protected)
router.put('/me/privacy', auth, async (req, res) => {
  try {
    const { isPublic } = req.body;
    if (typeof isPublic !== 'boolean') return res.status(400).json({ error: 'isPublic must be boolean' });
    const user = await User.findByIdAndUpdate(
      req.user.userId, 
      { isPublic }, 
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Failed to update privacy:', err);
    res.status(500).json({ error: 'Failed to update privacy' });
  }
});

// Get feedback for a user
router.get('/:id/feedback', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.isPublic) return res.status(403).json({ error: 'Profile is private' });
    
    const feedbacks = await Feedback.find({ user: req.params.id })
      .populate('swap', 'skillsOffered skillsWanted')
      .populate('user', 'name');
    res.json(feedbacks);
  } catch (err) {
    console.error('Failed to fetch feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Get user profile (public)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.isPublic) return res.status(403).json({ error: 'Profile is private' });
    res.json(user);
  } catch (err) {
    console.error('Failed to fetch user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Search users by skill, availability, etc.
router.get('/', async (req, res) => {
  try {
    const { skill, type, availability } = req.query;
    let filter = { isPublic: true, isBanned: false };
    
    if (skill && type) {
      if (type === 'offered') filter['skillsOffered.name'] = skill;
      else if (type === 'wanted') filter['skillsWanted.name'] = skill;
    }
    
    if (availability) {
      filter.availability = { $regex: availability, $options: 'i' };
    }
    
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    console.error('Failed to search users:', err);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

export default router;
