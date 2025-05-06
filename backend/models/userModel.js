export default class UserModel {
    constructor(db) {
      this.db = db;
    }
  
    async createUser({ name, email, password, age, height, weight }) {
      const result = await this.db.query(
        `INSERT INTO users (name, email, password, age, height, weight)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, email, password, age, height, weight]
      );
      return result.rows[0];
    }
  
    async findUserByEmail(email) {
      const result = await this.db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      return result.rows[0];
    }
  }