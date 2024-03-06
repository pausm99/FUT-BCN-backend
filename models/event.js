const db = require("../config/db");

class Event {
  
  constructor(name, reservation_id, field_id, user_id, date_time_start, date_time_end, incomplete) {
    this.name = name;
    this.reservation_id = reservation_id;
    this.field_id = field_id;
    this.user_id = user_id;
    this.date_time_start = date_time_start;
    this.date_time_end = date_time_end;
    this.incomplete = incomplete;
  }

  static async createEvent(event) {
    try {
        let sql = `
        INSERT INTO events(name, reservation_id, field_id, user_id, date_time_start, date_time_end, incomplete)
        VALUES (?, ?, ?, ?, ?, ?, ?); 
        `;

        const [result] = await db.execute(sql, [
            event.name,
            event.reservation_id,
            event.field_id,
            event.user_id,
            event.date_time_start,
            event.date_time_end,
            event.incomplete
        ]);

        return result.insertId;
    } catch (error) {
        console.log(error)
        throw error;
    }
  }

  static async getEventsByTimeRange(start, end) {
    try {
      
      let sql = `
      SELECT e.*, f.name AS field_name FROM events e JOIN football_fields f
      ON e.field_id = f.id
      WHERE date_time_start > ?
      AND date_time_start < ?;
      `;

      const [result] = await db.execute(sql, [start, end]);

      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEventById(id) {
    try {
        
        let sql = `
        SELECT * FROM events
        WHERE id = ?
        `;

        const [result] = await db.execute(sql, [id]);

        return result[0];

    } catch (error) {
        console.log(error)
        throw error;
    }
  }

}

module.exports = Event;