import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import inquiryRoutes from './routes/inquiries.js'
import testimonialRoutes from './routes/testimonials.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 5000

// Security
app.use(helmet())
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CLIENT_URL].filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:3000']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { message: 'Too many requests, please try again later.' } })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { message: 'Too many auth attempts, please try again later.' } })
app.use('/api', limiter)
app.use('/api/auth/login', authLimiter)
app.use('/api/auth/signup', authLimiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Serve React frontend in production
const clientDist = join(__dirname, '../../client/dist')
if (process.env.NODE_ENV === 'production' && existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (req, res) => res.sendFile(join(clientDist, 'index.html')))
} else {
  // 404 for API-only dev mode
  app.use((req, res) => res.status(404).json({ message: 'Route not found' }))
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message })
})

app.listen(PORT, () => {
  console.log(`🌿 Goddard Projects API running on port ${PORT}`)
})
