import { Link } from 'react-router-dom'
import Terminal from '../components/Terminal.jsx'
import styles from './Home.module.css'

const terminalLines = [
  { type: 'cmd', text: 'cat status.json' },
  { type: 'out', text: 'role:     <span style="color:var(--cyan)">"IT Officer, River Group"</span>' },
  { type: 'out', text: 'target:   <span style="color:var(--cyan)">"Network / Security Engineer"</span>' },
  { type: 'out', text: 'lab:      <span style="color:var(--green)">"online — Proxmox + OPNsense + Docker"</span>' },
  { type: 'out', text: 'certs:    <span style="color:var(--warn)">"CCNA in progress"</span>' },
  { type: 'out', text: 'location: <span style="color:var(--cyan)">"Kathmandu, Nepal"</span>' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: 'uptime' },
  { type: 'out', text: 'building for <span style="color:var(--green)">4 months</span> · never stopped learning' },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>

        <div className={styles.eyebrow}>// portfolio · deepeshkoirala.com.np</div>

        <h1 className={styles.name}>
          Deepesh Koirala<span className={styles.cursor} />
        </h1>

        <div className={styles.titleLine}>
          [ ASPIRING NETWORK &amp; SECURITY ENGINEER ]
        </div>

        <p className={styles.story}>
          My first real job was as a Network Engineer. I left to chase something bigger.
          A Masters abroad. A startup with my wife. Neither worked out.
          <span className={styles.emphasis}>
            I regret leaving networking. So I'm clawing my way back — one lab build at a time.
          </span>
        </p>

        <div className={styles.ctas}>
          <Link to="/lab" className={styles.btnPrimary}>./view_lab ↗</Link>
          <Link to="/about" className={styles.btnSecondary}>./my_story</Link>
          <Link to="/experience" className={styles.btnSecondary}>./experience</Link>
        </div>

        <Terminal
          title="deepesh@homelab — bash"
          lines={terminalLines}
          className={styles.terminal}
        />

      </section>
    </main>
  )
}
