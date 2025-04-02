import express from 'express';
import auth from '../middleware/auth.js';
import UserModel from '../models/userModel.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const db = req.app.get('db');
  const userModel = new UserModel(db);

  try {
    const user = await userModel.findUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;