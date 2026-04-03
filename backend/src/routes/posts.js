import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

// GET /api/posts — list all published posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, excerpt, tags, read_time, created_at AS date
       FROM posts WHERE published = true
       ORDER BY created_at DESC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('[posts] list error:', err)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// GET /api/posts/:slug — single post
router.get('/:slug', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, excerpt, content, tags, read_time, created_at AS date
       FROM posts WHERE slug = $1 AND published = true`,
      [req.params.slug]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('[posts] fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// POST /api/posts — create post (simple auth via header)
router.post('/', async (req, res) => {
  const token = req.headers['x-admin-token']
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const { slug, title, excerpt, content, tags, read_time } = req.body
  if (!slug || !title || !content) {
    return res.status(400).json({ error: 'slug, title, and content are required' })
  }
  try {
    const result = await pool.query(
      `INSERT INTO posts (slug, title, excerpt, content, tags, read_time)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [slug, title, excerpt || '', content, tags || [], read_time || '5 min']
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Slug already exists' })
    console.error('[posts] create error:', err)
    res.status(500).json({ error: 'Failed to create post' })
  }
})

export default router
