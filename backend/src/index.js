import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool, initDb } from './db.js'
import postsRouter from './routes/posts.js'
import contactRouter from './routes/contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/posts',   postsRouter)
app.use('/api/contact', contactRouter)

// Start
const start = async () => {
  try {
    await initDb()
    app.listen(PORT, () => {
      console.log(`[server] running on port ${PORT}`)
    })
  } catch (err) {
    console.error('[server] failed to start:', err)
    process.exit(1)
  }
}

start()
