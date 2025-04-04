export default class WorkoutModel {
    constructor(db) {
      this.db = db;
    }
  
    async createWorkout(userId, workout) {
      const { title, date, duration, calories, exercises } = workout;
      const result = await this.db.query(
        `INSERT INTO workouts (user_id, title, date, duration, calories, exercises)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [userId, title, date, duration, calories, JSON.stringify(exercises)]
      );
      return result.rows[0];
    }
  
    async getWorkoutsByUser(userId) {
      const result = await this.db.query(`SELECT * FROM workouts WHERE user_id = $1 ORDER BY date DESC`, [userId]);
      return result.rows;
    }
  
    async updateWorkout(id, userId, workout) {
      const { title, date, duration, calories, exercises } = workout;
      const result = await this.db.query(
        `UPDATE workouts SET title = $1, date = $2, duration = $3, calories = $4, exercises = $5
         WHERE id = $6 AND user_id = $7 RETURNING *`,
        [title, date, duration, calories, JSON.stringify(exercises), id, userId]
      );
      return result.rows[0];
    }
  
    async deleteWorkout(id, userId) {
      await this.db.query(`DELETE FROM workouts WHERE id = $1 AND user_id = $2`, [id, userId]);
    }
  }