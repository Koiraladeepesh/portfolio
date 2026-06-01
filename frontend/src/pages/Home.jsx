import { Link } from 'react-router-dom'
import Terminal from '../components/Terminal.jsx'
import styles from './Home.module.css'

const terminalLines = [
  { type: 'cmd', text: 'cat status.json' },
  { type: 'out', text: 'role:     <span style="color:var(--cyan)">"IT Officer, River Group"</span>' },
  { type: 'out', text: 'course:   <span style="color:var(--green)">"DevOps Bootcamp — Leapfrog Connect"</span>' },
  { type: 'out', text: 'target:   <span style="color:var(--cyan)">"DevOps / Cloud Infrastructure Engineer"</span>' },
  { type: 'out', text: 'lab:      <span style="color:var(--green)">"online — Proxmox + OPNsense + Docker"</span>' },
  { type: 'out', text: 'next:     <span style="color:var(--warn)">"AWS SAA → CCNA → CKA"</span>' },
  { type: 'out', text: 'location: <span style="color:var(--cyan)">"Kathmandu, Nepal"</span>' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: 'uptime' },
  { type: 'out', text: 'infrastructure running · always learning · ready to build' },
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
          [ ASPIRING DEVOPS &amp; CLOUD INFRASTRUCTURE ENGINEER ]
        </div>

        <p className={styles.story}>
          B.Tech Computer Science. MBA. Network &amp; System Engineer.
          Co-founder. Now managing IT infrastructure for a group of companies
          — and completing a DevOps bootcamp at Leapfrog Connect.
          <span className={styles.emphasis}>
            I build infrastructure, automate deployments, and manage networks.
            This site runs on my own hardware. Everything here is real and live.
          </span>
        </p>

        <div className={styles.ctas}>
          <Link to="/lab" className={styles.btnPrimary}>./view_lab ↗</Link>
          <Link to="/about" className={styles.btnSecondary}>./about_me</Link>
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
