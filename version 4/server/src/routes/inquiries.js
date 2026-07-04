import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../db/pool.js'
import { authenticate, requireAdmin, optionalAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', optionalAuth, async (req, res) => {
  const { product_id, message, name, email } = req.body
  if (!message) return res.status(400).json({ message: 'Message is required' })
  const userId = req.user?.id || null
  try {
    const id = uuidv4()
    await pool.query(
      'INSERT INTO inquiries (id,user_id,product_id,message,name,email) VALUES (?,?,?,?,?,?)',
      [id, userId, product_id || null, message, name || null, email || null]
    )
    const { rows } = await pool.query('SELECT * FROM inquiries WHERE id=?', [id])
    res.status(201).json({ inquiry: rows[0] })
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
})

router.get('/mine', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT i.*, p.name as product_name FROM inquiries i
       LEFT JOIN products p ON i.product_id = p.id
       WHERE i.user_id=? ORDER BY i.created_at DESC`,
      [req.user.id]
    )
    res.json({ inquiries: rows })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.get('/', authenticate, requireAdmin, async (req, res) => {
  const { limit = 50, offset = 0, status } = req.query
  try {
    let query = `SELECT i.*, u.name as user_name, u.email as user_email, p.name as product_name
                 FROM inquiries i
                 LEFT JOIN users u ON i.user_id = u.id
                 LEFT JOIN products p ON i.product_id = p.id`
    const params = []
    if (status) { params.push(status); query += ' WHERE i.status=?' }
    query += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), Number(offset))
    const { rows } = await pool.query(query, params)
    res.json({ inquiries: rows })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { status, response } = req.body
  try {
    await pool.query(
      'UPDATE inquiries SET status=COALESCE(?,status), response=COALESCE(?,response) WHERE id=?',
      [status || null, response || null, req.params.id]
    )
    const { rows } = await pool.query('SELECT * FROM inquiries WHERE id=?', [req.params.id])
    if (!rows.length) return res.status(404).json({ message: 'Not found' })
    res.json({ inquiry: rows[0] })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

export default router
