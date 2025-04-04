export default class GoalModel {
    constructor(db) {
      this.db = db;
    }
  
    async createGoal(userId, { type, target_value, unit }) {
      const result = await this.db.query(
        `INSERT INTO goals (user_id, type, target_value, unit)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, type, target_value, unit]
      );
      return result.rows[0];
    }
  
    async getGoalsByUser(userId) {
      const result = await this.db.query(`SELECT * FROM goals WHERE user_id = $1`, [userId]);
      return result.rows;
    }
  
    async updateGoal(id, userId, updates) {
      const { type, target_value, unit } = updates;
      const result = await this.db.query(
        `UPDATE goals SET type = $1, target_value = $2, unit = $3
         WHERE id = $4 AND user_id = $5 RETURNING *`,
        [type, target_value, unit, id, userId]
      );
      return result.rows[0];
    }
  
    async deleteGoal(id, userId) {
      await this.db.query(`DELETE FROM goals WHERE id = $1 AND user_id = $2`, [id, userId]);
    }
  }