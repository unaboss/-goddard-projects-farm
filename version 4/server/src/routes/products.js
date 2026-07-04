import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../db/pool.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()

function normalizeProduct(row) {
  if (!row) return row
  let season_tags = row.season_tags
  if (typeof season_tags === 'string') {
    try { season_tags = JSON.parse(season_tags) } catch { season_tags = [] }
  }
  return { ...row, season_tags: season_tags || [] }
}

router.get('/', async (req, res) => {
  const { category, availability, limit = 50, offset = 0 } = req.query
  let where = []
  const params = []
  if (category) { params.push(category); where.push('category=?') }
  if (availability && availability !== 'all') { params.push(availability); where.push('availability_status=?') }
  const whereStr = where.length ? 'WHERE ' + where.join(' AND ') : ''
  try {
    const { rows } = await pool.query(
      `SELECT * FROM products ${whereStr} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    )
    const count = await pool.query(`SELECT COUNT(*) as count FROM products ${whereStr}`, params)
    res.json({ products: rows.map(normalizeProduct), total: Number(count.rows[0].count) })
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id=?', [req.params.id])
    if (!rows.length) return res.status(404).json({ message: 'Product not found' })
    res.json({ product: normalizeProduct(rows[0]) })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, category, description, availability_status, season_tags, image } = req.body
  if (!name || !category) return res.status(400).json({ message: 'Name and category required' })
  try {
    const id = uuidv4()
    await pool.query(
      'INSERT INTO products (id,name,category,description,availability_status,season_tags,image) VALUES (?,?,?,?,?,?,?)',
      [id, name, category, description, availability_status || 'fresh', JSON.stringify(season_tags || []), image]
    )
    const { rows } = await pool.query('SELECT * FROM products WHERE id=?', [id])
    res.status(201).json({ product: normalizeProduct(rows[0]) })
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
})

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { name, category, description, availability_status, season_tags, image } = req.body
  try {
    await pool.query(
      'UPDATE products SET name=?,category=?,description=?,availability_status=?,season_tags=?,image=? WHERE id=?',
      [name, category, description, availability_status, JSON.stringify(season_tags || []), image, req.params.id]
    )
    const { rows } = await pool.query('SELECT * FROM products WHERE id=?', [req.params.id])
    if (!rows.length) return res.status(404).json({ message: 'Product not found' })
    res.json({ product: normalizeProduct(rows[0]) })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id=?', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

export default router
