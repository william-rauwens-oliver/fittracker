import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import authMiddleware from '../middleware/auth.js';
import { getMyProfile, updateMyProfile } from '../controllers/userController.js';

const router = express.Router();

// ✅ Inscription avec gestion d'erreurs serveur
router.post('/register', async (req, res) => {
  try {
    const db = req.app.get('db');
    const model = new UserModel(db);
    const { name, email, password, age, height, weight } = req.body;

    const existing = await model.findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await model.createUser({ name, email, password: hashed, age, height, weight });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error('Erreur dans /register:', err); // 👈 Log utile
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Connexion
router.post('/login', async (req, res) => {
  const db = req.app.get('db');
  const model = new UserModel(db);
  const { email, password } = req.body;

  const user = await model.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Identifiants invalides' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// ✅ Routes protégées
router.get('/me', authMiddleware, getMyProfile);
router.put('/me', authMiddleware, updateMyProfile);

export default router;