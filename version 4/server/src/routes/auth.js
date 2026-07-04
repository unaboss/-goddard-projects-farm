import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import pool from '../db/pool.js'
import { signAccess, signRefresh, verifyRefresh } from '../utils/jwt.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' })
  try {
    const exists = await pool.query('SELECT id FROM users WHERE email=?', [email.toLowerCase()])
    if (exists.rows.length) return res.status(409).json({ message: 'Email already in use' })
    const hash = await bcrypt.hash(password, 12)
    const id = uuidv4()
    await pool.query(
      'INSERT INTO users (id, name, email, password_hash) VALUES (?,?,?,?)',
      [id, name.trim(), email.toLowerCase(), hash]
    )
    const { rows } = await pool.query('SELECT id,name,email,role,created_at FROM users WHERE id=?', [id])
    const user = rows[0]
    const accessToken = signAccess({ id: user.id, role: user.role })
    const refreshToken = signRefresh({ id: user.id })
    await pool.query(
      'INSERT INTO refresh_tokens (id, user_id, token, expires_at) VALUES (?,?,?,DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [uuidv4(), user.id, refreshToken]
    )
    res.status(201).json({ user, accessToken, refreshToken })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=?', [email.toLowerCase()])
    const user = rows[0]
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' })
    const accessToken = signAccess({ id: user.id, role: user.role })
    const refreshToken = signRefresh({ id: user.id })
    await pool.query(
      'INSERT INTO refresh_tokens (id, user_id, token, expires_at) VALUES (?,?,?,DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [uuidv4(), user.id, refreshToken]
    )
    const { password_hash: _, ...safeUser } = user
    res.json({ user: safeUser, accessToken, refreshToken })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })
  try {
    const payload = verifyRefresh(refreshToken)
    const { rows } = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token=? AND expires_at > NOW()',
      [refreshToken]
    )
    if (!rows.length) return res.status(401).json({ message: 'Invalid refresh token' })
    const user = await pool.query('SELECT id,role FROM users WHERE id=?', [payload.id])
    if (!user.rows.length) return res.status(401).json({ message: 'User not found' })
    const accessToken = signAccess({ id: user.rows[0].id, role: user.rows[0].role })
    res.json({ accessToken })
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' })
  }
})

router.get('/me', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id,name,email,role,created_at FROM users WHERE id=?', [req.user.id])
    if (!rows.length) return res.status(404).json({ message: 'User not found' })
    res.json({ user: rows[0] })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/logout', authenticate, async (req, res) => {
  const { refreshToken } = req.body
  if (refreshToken) await pool.query('DELETE FROM refresh_tokens WHERE token=?', [refreshToken]).catch(() => {})
  res.json({ message: 'Logged out' })
})

export default router
