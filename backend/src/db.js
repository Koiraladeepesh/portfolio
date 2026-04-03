import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new pg.Pool({
  host:     process.env.DB_HOST     || 'postgres',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'portfolio',
  user:     process.env.DB_USER     || 'portfolio',
  password: process.env.DB_PASSWORD || 'changeme',
})

export async function initDb() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id         SERIAL PRIMARY KEY,
        slug       TEXT UNIQUE NOT NULL,
        title      TEXT NOT NULL,
        excerpt    TEXT,
        content    TEXT NOT NULL,
        tags       TEXT[] DEFAULT '{}',
        read_time  TEXT DEFAULT '5 min',
        published  BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS messages (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        subject    TEXT,
        message    TEXT NOT NULL,
        read       BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      INSERT INTO posts (slug, title, excerpt, content, tags, read_time)
      VALUES (
        'opnsense-vlans-proxmox',
        'How I set up OPNsense with VLANs on a Proxmox home lab',
        'A step-by-step walkthrough of building a proper VLAN-segmented network on a single machine.',
        '## The problem\n\nRunning a flat network at home means everything can talk to everything...\n\n*(Full post coming soon — this is a placeholder)*',
        ARRAY['networking','proxmox','opnsense','homelab'],
        '8 min'
      )
      ON CONFLICT (slug) DO NOTHING;
    `)
    console.log('[db] initialized')
  } finally {
    client.release()
  }
}
