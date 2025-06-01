import express from 'express';
import auth from '../middleware/auth.js';
import WorkoutModel from '../models/workoutModel.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const model = new WorkoutModel(req.app.get('db'));
  const workout = await model.createWorkout(req.user.id, req.body);
  res.status(201).json(workout);
});

router.get('/', auth, async (req, res) => {
  const model = new WorkoutModel(req.app.get('db'));
  const workouts = await model.getWorkoutsByUser(req.user.id);
  res.json(workouts);
});

router.put('/:id', auth, async (req, res) => {
  const model = new WorkoutModel(req.app.get('db'));
  const updated = await model.updateWorkout(req.params.id, req.user.id, req.body);
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const model = new WorkoutModel(req.app.get('db'));
  await model.deleteWorkout(req.params.id, req.user.id);
  res.status(204).send();
});

export default router;