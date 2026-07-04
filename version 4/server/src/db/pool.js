import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'goddard_projects',
  waitForConnections: true,
  connectionLimit: 10,
})

// Mimic the pg-style `{ rows }` result shape so route logic reads naturally.
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return { rows }
}

export default { query, raw: pool }
