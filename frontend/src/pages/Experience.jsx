import PageHeader from '../components/PageHeader.jsx'
import styles from './Experience.module.css'

const jobs = [
  {
    title: 'IT Officer',
    company: 'River Group',
    period: 'Jan 2026 — Present',
    type: 'Full-time',
    location: 'Kathmandu, Nepal',
    current: true,
    summary: 'Multi-company IT ownership across the River Group portfolio. Single-handedly managing infrastructure, support, and digital operations for multiple companies simultaneously.',
    points: [
      'Managing end-to-end IT infrastructure for multiple companies under the River Group',
      'Network administration, hardware procurement, user support, and systems maintenance',
      'Digital content production including video editing and graphic design for company communications',
      'Deployed and maintaining self-hosted portfolio infrastructure alongside day job',
    ],
    skills: ['Network Admin', 'Windows Server', 'Hardware', 'IT Support', 'Multi-site Management'],
  },
  {
    title: 'Co-founder',
    company: 'Rojgar Sutra',
    period: 'Dec 2024 — Dec 2025',
    type: 'Entrepreneurship',
    location: 'Kathmandu, Nepal',
    current: false,
    summary: 'Co-founded an HR and recruitment company with my wife. Built from zero — client acquisition, operations, team management, and business development. Operated for one full year.',
    points: [
      'Built the company from scratch alongside co-founder — no external funding',
      'Managed client relationships, candidate pipelines, and operations end-to-end',
      'Completed MBA thesis on business research while running the company simultaneously',
      'Made the difficult decision to wind down responsibly after evaluating growth prospects',
    ],
    skills: ['Leadership', 'Business Development', 'Operations', 'Client Management', 'Decision Making'],
    note: 'The startup didn\'t scale. But it taught me more about execution, resilience, and knowing when to pivot than anything else I\'ve done.',
  },
  {
    title: 'Network & System Engineer',
    company: 'iDream Technologies',
    period: 'Jan 2022 — Dec 2022',
    type: 'Full-time',
    location: 'Thapathali, Kathmandu',
    current: false,
    highlight: true,
    summary: 'My first real engineering role. Hands-on network infrastructure, system administration, and IT operations. This is the job title I\'m working to reclaim.',
    points: [
      'Configured and maintained network infrastructure including routers, switches, and firewalls',
      'Administered Windows and Linux servers — user management, backups, monitoring',
      'Diagnosed and resolved network connectivity and performance issues',
      'Managed IT support and infrastructure for company clients',
      'Completed Masters coursework simultaneously while working full-time',
    ],
    skills: ['Routing & Switching', 'Network Troubleshooting', 'Windows Server', 'Linux', 'Firewall Config', 'IT Support'],
    note: 'Leaving this role was my biggest professional regret. Every home lab build since has been pulling me back toward this work.',
  },
  {
    title: 'Freelance IT Consultant',
    company: 'Independent',
    period: 'Oct 2023 — Dec 2024',
    type: 'Freelance',
    location: 'Kathmandu, Nepal',
    current: false,
    summary: 'Independent IT consulting and technical work while completing MBA thesis research.',
    points: [
      'Delivered IT support and consulting engagements for small businesses',
      'Completed Masters in Business Management thesis research and writing',
      'Began planning and building initial home lab infrastructure',
    ],
    skills: ['IT Consulting', 'Research', 'Self-directed'],
  },
]

const education = [
  {
    degree: 'Masters in Business Management',
    institution: 'Coursework: Oct 2021–Oct 2023 · Thesis: completed mid-2025',
    note: 'Ran coursework simultaneously with Network Engineer role at iDream. Thesis completed while co-founding Rojgar Sutra.',
  },
  {
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Graduated 2020',
    note: '4-year engineering degree covering networking, systems, software development, and computer science fundamentals.',
  },
]

const skills = [
  { category: 'Networking',        items: ['OPNsense', 'VLAN Segmentation', 'Firewall Rules', 'DNS', 'Routing & Switching', 'Tailscale', 'Cloudflare'] },
  { category: 'Infrastructure',    items: ['Proxmox VE', 'Docker', 'Docker Compose', 'Nginx Proxy Manager', 'Linux (Ubuntu)', 'Windows Server'] },
  { category: 'Self-hosting',      items: ['Nextcloud', 'Jellyfin', 'AdGuard Home', 'Cloudflare Tunnel', 'Nginx'] },
  { category: 'Development',       items: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Git'] },
  { category: 'Currently studying',items: ['CCNA', 'AWS SAA', 'Network+', 'Security+'] },
]

export default function Experience() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// experience & skills"
        title="The work_"
        subtitle="Every role taught me something. The networking job taught me what I love. The startup taught me resilience. The lab proves I never stopped."
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// work history</div>
        <div className={styles.jobs}>
          {jobs.map((job, i) => (
            <div key={i} className={`${styles.jobCard} ${job.highlight ? styles.highlighted : ''} ${job.current ? styles.current : ''}`}>
              <div className={styles.jobHeader}>
                <div>
                  <div className={styles.jobTitle}>{job.title}</div>
                  <div className={styles.jobCompany}>{job.company}</div>
                </div>
                <div className={styles.jobMeta}>
                  <div className={styles.jobPeriod}>{job.period}</div>
                  <div className={styles.jobType}>{job.type}</div>
                  {job.current && <span className={styles.currentBadge}>● current</span>}
                </div>
              </div>
              <p className={styles.jobSummary}>{job.summary}</p>
              <ul className={styles.jobPoints}>
                {job.points.map((p, j) => (
                  <li key={j}><span className={styles.bullet}>→</span>{p}</li>
                ))}
              </ul>
              {job.note && <div className={styles.jobNote}>{job.note}</div>}
              <div className={styles.skillTags}>
                {job.skills.map((s, j) => (
                  <span key={j} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// education</div>
        <div className={styles.eduList}>
          {education.map((e, i) => (
            <div key={i} className={styles.eduCard}>
              <div className={styles.eduDegree}>{e.degree}</div>
              <div className={styles.eduInst}>{e.institution}</div>
              <p className={styles.eduNote}>{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// skills & tools</div>
        <div className={styles.skillsGrid}>
          {skills.map((cat, i) => (
            <div key={i} className={styles.skillCat}>
              <div className={styles.catName}>{cat.category}</div>
              <div className={styles.tagGroup}>
                {cat.items.map((item, j) => (
                  <span key={j} className={`${styles.tag} ${cat.category === 'Currently studying' ? styles.tagStudy : ''}`}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
