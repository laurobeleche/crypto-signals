// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
export async function getUsers() {
  try {
    const sql = 'SELECT * FROM users';
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários no banco de dados:', error);
    throw error;
  }
}

export async function getLastTradeTimestamp(userId) {
  try {
    const sql = 'SELECT utimestamp FROM trades WHERE userid = ? ORDER BY updatedTime DESC LIMIT 1';
    const [rows] = await pool.query(sql, [userId]);
    if (rows.length === 0) {
      return null;
    }
    return parseInt(rows[0].utimestamp);
  } catch (error) {
    console.error('Erro ao buscar o último registro no banco de dados:', error);
    throw error;
  }
}

export async function getUser(userId) {
  try {
    const user = await query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user[0];
  } catch (error) {
    console.error(`Error fetching user with id ${userId}:`, error.message);
    throw error;
  }
}