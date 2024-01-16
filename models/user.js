const db = require("../config/db");

class User {
  
  constructor(email, password, name, type, position, age, bank_account) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.type = type;
    this.position = position;
    this.age = age;
    this.bank_account = bank_account;
  }

  static async createUser(email, password, name, type, position, age, bank_account) {
    try {
      let sql = `
      INSERT INTO users (email, password, name, role, position, age, bank_account)
      VALUES (?,?,?,?,?,?,?);
      `;

      const [result] = await db.execute(sql, [
        email,
        password,
        name,
        type,
        position || null,
        age || null,
        bank_account || null
      ]);

      return result.insertId;

    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      
      let sql = `
      SELECT * FROM users
      WHERE email = ?;
      `;

      const [result] = await db.execute(sql, [email]);

      return result.length > 0 ? result[0] : null;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;