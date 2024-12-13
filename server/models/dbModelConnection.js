import mysql from 'mysql2/promise';
import { dbConfig } from "../configs/mySqlConfig.js"

export default class {
  async _init_poolConnection() {
    console.log(dbConfig)
    return await mysql.createPool(dbConfig)
  }

  async _getUsers(pool) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`SELECT * FROM users`);
    return rows;
  }

  async _getUserById(pool, id) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    return rows;
  }

  async _createUser(pool, values) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`
          INSERT INTO users(email, password, username, role) 
          VALUES (
            '${values.email}', 
            '${values.password}', 
            '${values.username}', 
            '${values.role}'
          );
      `);
    return rows;

  }

  async _updateUser(pool, id, values) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`
          UPDATE users
          SET 
            email = '${values.email}', 
            password = '${values.password}', 
            username = '${values.username}', 
            role = '${values.role}' 
          WHERE id = ${id};
      `);
    return rows;
  }

  async _deleteUser(pool, id) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`DELETE FROM users WHERE (id = '${id}');`);
    return rows;
  }
} 