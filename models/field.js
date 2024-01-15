const db = require("../config/db");

class Field {
  
  constructor(company_id, name, type, location_lat, location_lng, address, is_public, width, length, opening_time, closing_time) {
    this.company_id = company_id;
    this.name = name;
    this.type = type;
    this.location_lat = location_lat;
    this.location_lng = location_lng;
    this.address = address;
    this.is_public = is_public;
    this.width = width;
    this.length = length;
    this.opening_time = opening_time;
    this.closing_time = closing_time;
  }

  static async createField(company_id, name, type, location_lat, location_lng, address, is_public, width, length, opening_time, closing_time) {
    try {
      let sql = `
      INSERT INTO football_fields (company_id, name, type, location_lat, location_lng, address, public, width, length, opening_time, closing_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      const [result] = await db.execute(sql, [
        company_id || null, 
        type,
        location_lat,
        location_lng,
        address,
        is_public,
        width,
        length,
        opening_time || null,
        closing_time || null
      ]);

      return result.insertId;

    } catch (error) {
      throw error;
    }
  }

  static async getAllFields() {
    try {
      let sql = `
      SELECT * FROM football_fields;
      `

      const [result] = await db.execute(sql);

      return result;
      
    } catch (error) {
      throw error
    }
  }

  static async getFieldById(id) {
    try {
      
      let sql = `
      SELECT * FROM fields
      WHERE id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result.length > 0 ? result[0] : null;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = Field;