import PageHeader from '../components/PageHeader.jsx'
import Terminal from '../components/Terminal.jsx'
import styles from './Goals.module.css'

const roadmap = [
  { phase: 'Q2 2026', title: 'CCNA certification',         status: 'active',  items: ['Complete Cisco CCNA curriculum', 'Pass 200-301 exam', 'Document lab configs as study material'] },
  { phase: 'Q3 2026', title: 'AWS Solutions Architect SAA', status: 'planned', items: ['Cloud networking fundamentals', 'VPC, security groups, routing', 'SAA-C03 exam'] },
  { phase: 'Q4 2026', title: 'Security foundations',        status: 'planned', items: ['CompTIA Security+', 'First HackTheBox / TryHackMe machines', 'Add Suricata IDS to home lab'] },
  { phase: '2027',    title: 'Advanced security',           status: 'future',  items: ['CEH or eJPT', 'Network penetration testing labs', 'OSCP preparation begins'] },
]

const targetRoles = [
  { role: 'Network Engineer',           focus: 'Design, build, and maintain network infrastructure. Routing, switching, firewall policy, VLAN design. This is where I started and where I belong.' },
  { role: 'SOC Analyst (L1/L2)',        focus: 'Security monitoring, incident response, log analysis. The Wazuh SIEM I\'m deploying at home is direct preparation for this.' },
  { role: 'Cloud Network Engineer',     focus: 'AWS/Azure networking — VPCs, peering, transit gateways, security groups. CCNA + AWS SAA builds directly toward this.' },
  { role: 'DevSecOps Engineer',         focus: 'Security built into infrastructure pipelines. My Docker + Cloudflare + self-hosting experience is directly relevant here.' },
]

const termLines = [
  { type: 'cmd',   text: 'cat roadmap.json | jq .current' },
  { type: 'out',   text: '<span style="color:var(--cyan)">phase:</span>  <span style="color:var(--green)">"Q2 2026"</span>' },
  { type: 'out',   text: '<span style="color:var(--cyan)">goal:</span>   <span style="color:var(--green)">"CCNA 200-301"</span>' },
  { type: 'out',   text: '<span style="color:var(--cyan)">status:</span> <span style="color:var(--warn)">"in progress"</span>' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'echo $TARGET_ROLE' },
  { type: 'out',   text: '<span style="color:var(--green)">Network Engineer | Security Specialist</span>' },
]

export default function Goals() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// where i'm heading"
        title="The plan_"
        subtitle="I know exactly what I want. Here's how I'm getting there — and why I'm worth a conversation if you're hiring."
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// certification roadmap</div>
        <div className={styles.roadmap}>
          {roadmap.map((phase, i) => (
            <div key={i} className={`${styles.phaseCard} ${styles[phase.status]}`}>
              <div className={styles.phaseHeader}>
                <div>
                  <div className={styles.phaseTime}>{phase.phase}</div>
                  <div className={styles.phaseTitle}>{phase.title}</div>
                </div>
                <span className={`${styles.statusBadge} ${styles[`badge_${phase.status}`]}`}>
                  {phase.status === 'active' ? '● active' : phase.status}
                </span>
              </div>
              <ul className={styles.phaseItems}>
                {phase.items.map((item, j) => (
                  <li key={j}><span className={styles.arrow}>→</span>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// target roles</div>
        <div className={styles.rolesGrid}>
          {targetRoles.map((r, i) => (
            <div key={i} className={styles.roleCard}>
              <div className={styles.roleName}>{r.role}</div>
              <p className={styles.roleFocus}>{r.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// current status</div>
        <Terminal title="goals.sh" lines={termLines} className={styles.terminal} />
      </section>

      <section className={styles.hireSection}>
        <div className={styles.sectionLabel}>// if you're hiring</div>
        <div className={styles.hireCard}>
          <div className={styles.hireTitle}>Here's why I'm worth a conversation</div>
          <div className={styles.hirePoints}>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>01</span>
              <div>
                <div className={styles.hirePointTitle}>I've already done the job</div>
                <p>1 year as a Network & System Engineer at iDream Technologies. This isn't a career change — it's a return.</p>
              </div>
            </div>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>02</span>
              <div>
                <div className={styles.hirePointTitle}>The lab proves I mean it</div>
                <p>Proxmox, OPNsense, VLAN segmentation, Docker, Cloudflare Tunnel — all running 24/7. Not a tutorial. A real infrastructure.</p>
              </div>
            </div>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>03</span>
              <div>
                <div className={styles.hirePointTitle}>I know what I want</div>
                <p>Networking and security. Not a stepping stone to something else. The plan has been clear since December 2025.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
