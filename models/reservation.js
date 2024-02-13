const db = require("../config/db");

class Reservation {
  
  constructor(user_id, field_id, date_time_start, date_time_end, amount, paid) {
    this.user_id = user_id;
    this.field_id = field_id;
    this.date_time_start = date_time_start;
    this.date_time_end = date_time_end;
    this.amount = amount;
    this.paid = paid;
  }

  static async createReservation(reservation) {

    try {
      let sql = `
      INSERT INTO reservations (user_id, field_id, date_time_start, date_time_end, amount, paid)
      VALUES (?, ?, ?, ?, ?, ?);
      `;

      const [result] = await db.execute(sql, [
        reservation.user_id,
        reservation.field_id,
        reservation.date_time_start,
        reservation.date_time_end,
        reservation.amount || null,
        reservation.paid || null,
      ]);

      return result.insertId;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async getReservationById(id) {
    try {
      
      let sql = `
      SELECT * FROM reservations
      WHERE id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result[0];

    } catch (error) {
      throw error;
    }
  }

  static async getReservationsByUserId(id) {
    try {
      
      let sql = `
      SELECT * FROM reservations
      WHERE user_id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result;

    } catch (error) {
      throw error;
    }
  }

  static async deleteReservationById(id) {
    try {

      let sql = `
      DELETE from reservations
      WHERE id = ?;
      `;

      return db.execute(sql, [id]);

    } catch (error) {
      throw error;
    }
  }

  static async getReservationsByFieldId(field_id) {
    try {

      let sql = `
      SELECT * from reservations
      WHERE field_id = ?;
      `;

      const [result] = await db.execute(sql, [field_id]);

      return result;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reservation;