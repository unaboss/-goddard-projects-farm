import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Goddard Projects Farm API v5',
    version: '5.0.0',
    timestamp: new Date().toISOString(),
  })
})

export default router
