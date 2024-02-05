const db = require("../config/db");

class AvailableReservation {
  
  constructor(field_id, date_time_start, date_time_end, price) {
    this.field_id = field_id;
    this.date_time_start = date_time_start;
    this.date_time_end = date_time_end;
    this.price = price;
  }

  static async createAvailableReservation(availablereservation) {

    try {
      let sql = `
      INSERT INTO available_reservations (field_id, date_time_start, date_time_end, price)
      VALUES (?, ?, ?, ?);
      `;

      const [result] = await db.execute(sql, [
        availablereservation.field_id,
        availablereservation.date_time_start,
        availablereservation.date_time_end,
        availablereservation.price,
      ]);

      return result.insertId;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async getAvailableReservationById(id) {
    try {
      
      let sql = `
      SELECT * FROM available_reservations
      WHERE id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result[0];

    } catch (error) {
      throw error;
    }
  }

  static async deleteAvailableReservationById(id) {
    try {

      let sql = `
      DELETE from available_reservations
      WHERE id = ?;
      `;

      return db.execute(sql, [id]);

    } catch (error) {
      throw error;
    }
  }

  static async getAvailableReservationsByFieldId(field_id) {
    try {

      let sql = `
      SELECT * from available_reservations
      WHERE field_id = ?;
      `;

      const [result] = await db.execute(sql, [field_id]);

      return result;

    } catch (error) {
      throw error;
    }
  }

  static async getAllTypeByFieldIdAndRange(field_id, start, end) {
    try {
      
      let sql = `
      SELECT 'available' as type, field_id, date_time_start, date_time_end, price
      FROM available_reservations
      WHERE available_reservations.field_id = ?
        AND available_reservations.date_time_start BETWEEN ? AND ?

      UNION

      SELECT 'occupied' as type, field_id, date_time_start, date_time_end, amount
      FROM reservations
      WHERE reservations.field_id = ?
      AND reservations.date_time_start BETWEEN ? AND ?;

      `;

      const [result] = await db.execute(sql, [field_id, start, end, field_id, start, end]);

      return result;
      
    } catch (error) {
      throw error;
    }
  }

}

module.exports = AvailableReservation;