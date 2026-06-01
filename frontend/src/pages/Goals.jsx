import PageHeader from '../components/PageHeader.jsx'
import Terminal from '../components/Terminal.jsx'
import styles from './Goals.module.css'

const roadmap = [
  {
    phase: 'May–Jul 2026',
    title: 'DevOps Bootcamp — Leapfrog Connect',
    status: 'active',
    items: [
      'Linux, shell scripting, system monitoring',
      'Jenkins CI/CD pipelines connected to GitHub',
      'Docker, Docker Compose, Docker Swarm',
      'Kubernetes — Pods, Deployments, Helm charts',
      'AWS — EC2, VPC, S3, RDS, IAM, ECS',
      'Final project: fully automated GitHub → Jenkins → Docker → AWS pipeline',
    ]
  },
  {
    phase: 'Aug–Sep 2026',
    title: 'AWS Solutions Architect Associate',
    status: 'planned',
    items: [
      'Deepen AWS knowledge from the bootcamp',
      'VPC design, subnetting, security groups',
      'Pass SAA-C03 exam',
    ]
  },
  {
    phase: 'Oct–Dec 2026',
    title: 'CCNA 200-301',
    status: 'planned',
    items: [
      'Formalise existing networking knowledge',
      'Routing, switching, OSPF, BGP fundamentals',
      'Pass CCNA exam — home lab is the study environment',
    ]
  },
  {
    phase: '2027',
    title: 'Certified Kubernetes Administrator (CKA)',
    status: 'future',
    items: [
      'Advanced Kubernetes — StatefulSets, PVCs, RBAC',
      'Deploy K3s cluster on Proxmox home lab',
      'Pass CKA exam',
    ]
  },
  {
    phase: '2027+',
    title: 'Security Specialisation',
    status: 'future',
    items: [
      'CompTIA Security+ or CEH',
      'Wazuh SIEM + Suricata IDS on home lab',
      'HackTheBox and TryHackMe',
    ]
  },
]

const targetRoles = [
  { role: 'DevOps Engineer',               focus: 'CI/CD pipelines, container orchestration, infrastructure automation. The Leapfrog bootcamp combined with my home lab Docker experience builds directly toward this.' },
  { role: 'Cloud Infrastructure Engineer', focus: 'AWS/Azure networking — VPCs, ECS, RDS, IAM. AWS SAA is next on the roadmap after the bootcamp.' },
  { role: 'Network Engineer',              focus: 'Design and maintain network infrastructure. My home lab — OPNsense, VLANs, firewall rules — proves I already think like a network engineer. CCNA formalises it.' },
  { role: 'Site Reliability Engineer',     focus: 'Uptime, automation, monitoring, incident response. Running production self-hosted services 24/7 is direct SRE experience at home scale.' },
]

const termLines = [
  { type: 'cmd',   text: 'cat roadmap.json | jq .current' },
  { type: 'out',   text: '<span style="color:var(--cyan)">phase:</span>  <span style="color:var(--green)">"May–Jul 2026"</span>' },
  { type: 'out',   text: '<span style="color:var(--cyan)">course:</span> <span style="color:var(--green)">"DevOps Bootcamp — Leapfrog Connect"</span>' },
  { type: 'out',   text: '<span style="color:var(--cyan)">next:</span>   <span style="color:var(--warn)">"AWS SAA → CCNA → CKA"</span>' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'echo $TARGET_ROLE' },
  { type: 'out',   text: '<span style="color:var(--green)">DevOps Engineer | Cloud Infrastructure | Network Engineer</span>' },
]

export default function Goals() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// where i'm heading"
        title="The plan_"
        subtitle="DevOps bootcamp running. AWS next. CCNA after. Every step builds on the last."
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// certification & learning roadmap</div>
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
          <div className={styles.hireTitle}>Why I am worth a conversation</div>
          <div className={styles.hirePoints}>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>01</span>
              <div>
                <div className={styles.hirePointTitle}>Already running production infrastructure</div>
                <p>Proxmox, OPNsense, VLAN segmentation, Docker Compose, Cloudflare Tunnel, Tailscale — all running 24/7. Not a tutorial. A real self-hosted infrastructure stack.</p>
              </div>
            </div>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>02</span>
              <div>
                <div className={styles.hirePointTitle}>Network foundation + DevOps trajectory</div>
                <p>1 year as a Network & System Engineer. Now containerising, automating, and deploying full-stack applications on my own hardware. DevOps bootcamp running. AWS SAA and CCNA next.</p>
              </div>
            </div>
            <div className={styles.hirePoint}>
              <span className={styles.hireNum}>03</span>
              <div>
                <div className={styles.hirePointTitle}>Business thinking built in</div>
                <p>MBA and co-founder experience means I understand infrastructure decisions beyond the technical layer — cost, risk, reliability, and what actually matters to the business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
