export const getMyProfile = async (req, res) => {
    const db = req.app.get('db');
    const userId = req.user.id;
  
    try {
      const result = await db.query('SELECT id, name, email, age, height, weight FROM users WHERE id = $1', [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erreur getMyProfile:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  
  export const updateMyProfile = async (req, res) => {
    const db = req.app.get('db');
    const userId = req.user.id;
    const { name, email, age, height, weight } = req.body;
  
    try {
      const result = await db.query(
        `UPDATE users SET name = $1, email = $2, age = $3, height = $4, weight = $5 WHERE id = $6 RETURNING id, name, email, age, height, weight`,
        [name, email, age, height, weight, userId]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erreur updateMyProfile:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };