import express from 'express';
import auth from '../middleware/auth.js';
import GoalModel from '../models/goalModel.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const model = new GoalModel(req.app.get('db'));
  const goal = await model.createGoal(req.user.id, req.body);
  res.status(201).json(goal);
});

router.get('/', auth, async (req, res) => {
  const model = new GoalModel(req.app.get('db'));
  const goals = await model.getGoalsByUser(req.user.id);
  res.json(goals);
});

router.put('/:id', auth, async (req, res) => {
  const model = new GoalModel(req.app.get('db'));
  const updated = await model.updateGoal(req.params.id, req.user.id, req.body);
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const model = new GoalModel(req.app.get('db'));
  await model.deleteGoal(req.params.id, req.user.id);
  res.status(204).send();
});

export default router;