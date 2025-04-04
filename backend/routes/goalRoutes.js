import express from 'express';
import auth from '../middleware/auth.js';
import GoalModel from '../models/goalModel.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const db = req.app.get('db');
  const goalModel = new GoalModel(db);
  const userId = req.user.id;
  try {
    const goal = await goalModel.createGoal(userId, req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const db = req.app.get('db');
  const goalModel = new GoalModel(db);
  try {
    const goals = await goalModel.getGoalsByUser(req.user.id);
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const db = req.app.get('db');
  const goalModel = new GoalModel(db);
  try {
    const updated = await goalModel.updateGoal(req.params.id, req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const db = req.app.get('db');
  const goalModel = new GoalModel(db);
  try {
    await goalModel.deleteGoal(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;