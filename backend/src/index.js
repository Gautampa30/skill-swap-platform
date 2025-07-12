
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import swapRoutes from './routes/swap.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';

dotenv.config();
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/swap', swapRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Skill Swap Platform API',
    version: '1.0.0',
    status: 'running'
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Create default admin if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@skillswap.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.default.hash(adminPassword, 10);
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hash,
        isAdmin: true,
        isPublic: false
      });
      console.log('Default admin user created.');
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
