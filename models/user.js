const db = require("../config/db");

class User {
  
  constructor(email, password, name, role, position, age, bank_account, phone) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.position = position;
    this.age = age;
    this.bank_account = bank_account;
    this.phone = phone;
  }

  static async createUser(email, password, name, role, position, age, bank_account, phone) {
    try {
      let sql = `
      INSERT INTO users (email, password, name, role, position, age, bank_account, phone)
      VALUES (?,?,?,?,?,?,?,?);
      `;

      const [result] = await db.execute(sql, [
        email,
        password,
        name,
        role,
        position || null,
        age || null,
        bank_account || null,
        phone || null
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

  static async getUserById(id) {
    try {
      let sql = `
      SELECT email, name, role, position, age, bank_account, phone
      FROM users
      WHERE id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;