import { Router } from 'express'
import { pool } from '../db.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    await pool.query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject || '', message]
    )
    console.log(`[contact] new message from ${name} <${email}>`)

    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFY_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL,
          subject: `[Portfolio] New message from ${name}${subject ? ` — ${subject}` : ''}`,
          html: `
            <div style="font-family: monospace; background: #0a0e0a; color: #c8d8c8; padding: 24px; border-radius: 8px;">
              <h2 style="color: #00ff88; margin: 0 0 20px;">// new message from your portfolio</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #4a7a4a; padding: 6px 0; width: 80px;">name</td>
                  <td style="color: #00ffcc;">${name}</td>
                </tr>
                <tr>
                  <td style="color: #4a7a4a; padding: 6px 0;">email</td>
                  <td style="color: #00ffcc;"><a href="mailto:${email}" style="color: #00ffcc;">${email}</a></td>
                </tr>
                ${subject ? `<tr>
                  <td style="color: #4a7a4a; padding: 6px 0;">subject</td>
                  <td style="color: #c8d8c8;">${subject}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 20px; border-top: 1px solid #1a2a1a; padding-top: 16px;">
                <div style="color: #4a7a4a; margin-bottom: 8px;">message</div>
                <div style="color: #c8d8c8; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              </div>
              <div style="margin-top: 20px; color: #2a5a2a; font-size: 12px;">
                deepeshkoirala.com.np · ${new Date().toISOString()}
              </div>
            </div>
          `,
          text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ''}\n\nMessage:\n${message}`,
        })
        console.log(`[contact] notification sent to ${process.env.NOTIFY_EMAIL}`)
      } catch (mailErr) {
        console.error('[contact] email notification failed:', mailErr.message)
      }
    }

    res.json({ success: true })
  } catch (err) {
    console.error('[contact] error:', err)
    res.status(500).json({ error: 'Failed to save message' })
  }
})

export default router
