import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../db/pool.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email, and message required' })
  try {
    await pool.query(
      'INSERT INTO contact_messages (id,name,email,phone,subject,message) VALUES (?,?,?,?,?,?)',
      [uuidv4(), name, email, phone || null, subject || null, message]
    )
    res.status(201).json({ message: 'Message received' })
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
})

export default router
