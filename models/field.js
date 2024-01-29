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

  static async createField(field) {

    try {
      let sql = `
      INSERT INTO football_fields (company_id, name, type, location_lat, location_lng, address, public, width, length, opening_time, closing_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      const [result] = await db.execute(sql, [
        field.company_id || null, 
        field.name,
        field.type,
        field.location_lat,
        field.location_lng,
        field.address,
        field.public,
        field.width,
        field.length,
        field.opening_time || null,
        field.closing_time || null
      ]);

      return result.insertId;

    } catch (error) {
      console.log(error)
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
      SELECT * FROM football_fields
      WHERE id = ?;
      `;

      const [result] = await db.execute(sql, [id]);

      return result[0];

    } catch (error) {
      throw error;
    }
  }

  static async getCompanyFields(company_id) {
    try {
      
      let sql = `
      SELECT * FROM football_fields
      WHERE company_id = ?;
      `

      const [result] = await db.execute(sql, [company_id]);

      return result;
    } catch (error) {
      throw error
    }
  }

  static async deleteFieldById(id) {
    try {

      let sql = `
      DELETE from football_fields
      WHERE id = ?;
      `;

      return db.execute(sql, [id]);

    } catch (error) {
      
    }
  }
}

module.exports = Field;