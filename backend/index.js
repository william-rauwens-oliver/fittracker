import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
app.set('db', pool);


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/goals', goalRoutes); 
app.use('/api/workouts', workoutRoutes);

app.get('/', (req, res) => {
  res.send('FitTracker API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});