import { Router } from 'express'
import pool from '../db/pool.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()
router.use(authenticate, requireAdmin)

router.get('/stats', async (req, res) => {
  try {
    const [p, i, u, t] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM products'),
      pool.query('SELECT COUNT(*) as count FROM inquiries'),
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM testimonials'),
    ])
    res.json({
      products: Number(p.rows[0].count),
      inquiries: Number(i.rows[0].count),
      users: Number(u.rows[0].count),
      testimonials: Number(t.rows[0].count),
    })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id,name,email,role,created_at FROM users ORDER BY created_at DESC')
    res.json({ users: rows })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

export default router
