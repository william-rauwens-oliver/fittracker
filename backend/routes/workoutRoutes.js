// backend/routes/workoutRoutes.js
import express from 'express';
import auth from '../middleware/auth.js';
import WorkoutModel from '../models/workoutModel.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const db = req.app.get('db');
  const model = new WorkoutModel(db);
  try {
    const workout = await model.createWorkout(req.user.id, req.body);
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const db = req.app.get('db');
  const model = new WorkoutModel(db);
  try {
    const workouts = await model.getWorkoutsByUser(req.user.id);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const db = req.app.get('db');
  const model = new WorkoutModel(db);
  try {
    const updated = await model.updateWorkout(req.params.id, req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const db = req.app.get('db');
  const model = new WorkoutModel(db);
  try {
    await model.deleteWorkout(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;