const db = require("../config/db");

class Event {
  
  constructor(name, reservation_id, field_id, user_id, date_time_start, date_time_end, incomplete, max_players) {
    this.name = name;
    this.reservation_id = reservation_id;
    this.field_id = field_id;
    this.user_id = user_id;
    this.date_time_start = date_time_start;
    this.date_time_end = date_time_end;
    this.incomplete = incomplete;
    this.max_players = max_players;
  }

  static async createEvent(event) {
    try {
        let sql = `
        INSERT INTO events(name, reservation_id, field_id, user_id, date_time_start, date_time_end, incomplete, max_players)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?); 
        `;

        const [result] = await db.execute(sql, [
            event.name,
            event.reservation_id,
            event.field_id,
            event.user_id,
            event.date_time_start,
            event.date_time_end,
            event.incomplete,
            event.max_players || null
        ]);

        return result.insertId;
    } catch (error) {
        console.log(error)
        throw error;
    }
  }

  static async getEventsByTimeRange(start) {
    try {
      
      let sql = `
      SELECT e.*, f.name AS field_name FROM events e JOIN football_fields f
      ON e.field_id = f.id
      WHERE date_time_start > ?;
      `;

      const [result] = await db.execute(sql, [start]);

      return result;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEventById(id) {
    try {
        
        let sql = `
        SELECT e.*, f.name AS field_name, f.type AS field_type, u.name AS user_name, f.address FROM events e
        JOIN football_fields f
        ON e.field_id = f.id
        JOIN users u
        ON e.user_id = u.id
        WHERE e.id = ?
        `;

        const [result] = await db.execute(sql, [id]);

        return result[0];

    } catch (error) {
        console.log(error)
        throw error;
    }
  }

  static async getNPlayersEnrolledToEvent(event_id, user_id) {
    try {
      
      let sql = `
        SELECT 
          COUNT(*) AS player_count,
          MAX(CASE WHEN user_id = ? THEN 1 ELSE 0 END) AS user_exists
        FROM event_users
        WHERE event_id = ?;
      `;

      const [result] = await db.execute(sql, [user_id, event_id]);

      return result[0];

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async joinEvent(event_id, user_id) {
    let sql = `
      INSERT INTO event_users (user_id, event_id)
      VALUES (?, ?);
    `;

    try {

      await db.execute(sql, [user_id, event_id]);
      return;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async unEnrollEvent(event_id, user_id) {
    let sql = `
      DELETE FROM event_users
      WHERE event_id = ? AND user_id = ?;
    `;

    try {

      await db.execute(sql, [event_id, user_id]);
      return;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

}

module.exports = Event;