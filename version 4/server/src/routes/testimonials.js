import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../db/pool.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const { approved, limit = 50 } = req.query
  try {
    let query = 'SELECT * FROM testimonials'
    if (approved === 'true') { query += ' WHERE approved=TRUE' }
    query += ' ORDER BY created_at DESC LIMIT ?'
    const { rows } = await pool.query(query, [Number(limit)])
    res.json({ testimonials: rows })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', authenticate, async (req, res) => {
  const { message, rating } = req.body
  if (!message) return res.status(400).json({ message: 'Message required' })
  try {
    const user = await pool.query('SELECT name FROM users WHERE id=?', [req.user.id])
    const id = uuidv4()
    await pool.query(
      'INSERT INTO testimonials (id,user_id,name,message,rating) VALUES (?,?,?,?,?)',
      [id, req.user.id, user.rows[0]?.name, message, rating || 5]
    )
    const { rows } = await pool.query('SELECT * FROM testimonials WHERE id=?', [id])
    res.status(201).json({ testimonial: rows[0] })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { approved } = req.body
  try {
    await pool.query('UPDATE testimonials SET approved=? WHERE id=?', [approved, req.params.id])
    const { rows } = await pool.query('SELECT * FROM testimonials WHERE id=?', [req.params.id])
    if (!rows.length) return res.status(404).json({ message: 'Not found' })
    res.json({ testimonial: rows[0] })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id=?', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

export default router
