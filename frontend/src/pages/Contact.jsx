import { useState } from 'react'
import axios from 'axios'
import PageHeader from '../components/PageHeader.jsx'
import Terminal from '../components/Terminal.jsx'
import styles from './Contact.module.css'

const termLines = [
  { type: 'cmd',   text: 'cat contact.txt' },
  { type: 'out',   text: 'email:    <span style="color:var(--cyan)">dipeshkoirala4@gmail.com</span>' },
  { type: 'out',   text: 'github:   <span style="color:var(--cyan)">github.com/koiraladeepesh</span>' },
  { type: 'out',   text: 'linkedin: <span style="color:var(--cyan)">coming soon</span>' },
  { type: 'out',   text: 'location: <span style="color:var(--cyan)">Kathmandu, Nepal (UTC+5:45)</span>' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'echo $AVAILABILITY' },
  { type: 'out',   text: '<span style="color:var(--green)">open to networking, security, and infrastructure roles</span>' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', text: '// error: name, email, and message are required' })
      return
    }
    try {
      setSending(true)
      await axios.post('/api/contact', form)
      setStatus({ type: 'success', text: '// message sent successfully. I\'ll respond within 24 hours.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ type: 'error', text: '// error sending message. try emailing directly.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className={styles.main}>
      <PageHeader
        label="// contact"
        title="Get in touch_"
        subtitle="Open to networking roles, security positions, and interesting conversations. Response within 24 hours."
      />

      <div className={styles.grid}>
        <div className={styles.left}>
          <Terminal title="contact.sh" lines={termLines} className={styles.terminal} />
        </div>

        <div className={styles.right}>
          <div className={styles.formCard}>
            <div className={styles.formLabel}>// send a message</div>

            <div className={styles.field}>
              <label className={styles.label}>name</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="your name"
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>subject</label>
              <input
                className={styles.input}
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Network Engineer role at ..."
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>message</label>
              <textarea
                className={styles.textarea}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="your message..."
                rows={5}
              />
            </div>

            {status && (
              <div className={`${styles.status} ${styles[status.type]}`}>
                {status.text}
              </div>
            )}

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={sending}
            >
              {sending ? '// sending...' : './send_message ↗'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
