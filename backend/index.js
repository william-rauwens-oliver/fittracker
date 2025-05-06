import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import authRoutes from './routes/authRoutes.js';
import goalRoutes from './routes/goalRoutes.js'; // ✅ ajout ici
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion PostgreSQL
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
app.set('db', pool);

// Enregistrement des routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes); // ✅ ajout ici
app.use('/api/workouts', workoutRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('FitTracker API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});