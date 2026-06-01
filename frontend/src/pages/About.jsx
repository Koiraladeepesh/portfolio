import PageHeader from '../components/PageHeader.jsx'
import styles from './About.module.css'

const timeline = [
  {
    period: '2020',
    title: 'B.Tech Computer Science & Engineering',
    sub: 'Graduated · 4-year CS & Engineering foundation',
    note: 'Strong technical foundation in networking, systems, and software engineering.',
    color: 'green',
  },
  {
    period: 'Jan–Dec 2022',
    title: 'Network & System Engineer — iDream Technologies',
    sub: 'Thapathali, Kathmandu · while completing Masters simultaneously',
    note: 'Hands-on network and system engineering — firewalls, routing, Windows Server, VMware, Hyper-V. Worked full-time while studying for my Masters.',
    color: 'cyan',
    highlight: true,
  },
  {
    period: 'Oct 2021–Oct 2023',
    title: 'Masters in Business Management',
    sub: 'Coursework completed · ran alongside engineering career',
    note: 'Studied and worked simultaneously. Understanding the business side of technology makes me a stronger engineer.',
    color: 'purple',
  },
  {
    period: 'Oct 2023–Dec 2024',
    title: 'Freelance IT Consultant + MBA Thesis',
    sub: 'Independent consulting · research · self-directed',
    note: 'Delivered IT consulting engagements while completing postgraduate research. Built the foundations of my home lab during this period.',
    color: 'dim',
  },
  {
    period: 'Dec 2024–Dec 2025',
    title: 'Co-founder & Director — Rojgar Sutra Pvt. Ltd.',
    sub: 'HR & Recruitment company · with my wife · 1 year',
    note: 'Built a company from scratch. Managed operations, technical infrastructure, client relationships, and business development. A masterclass in execution under pressure.',
    color: 'warn',
  },
  {
    period: 'Jan 2026 →',
    title: 'IT Officer — River Group · DevOps Bootcamp',
    sub: 'Multi-company IT ownership · Leapfrog Connect DevOps course · home lab running',
    note: 'Managing end-to-end IT infrastructure across multiple companies while completing a DevOps bootcamp at Leapfrog Connect — Linux, Jenkins, Docker, Kubernetes, AWS. Production home lab running 24/7.',
    color: 'green',
    current: true,
  },
]

export default function About() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// about me"
        title="Builder. Engineer. Operator._"
        subtitle="I build infrastructure, automate systems, and manage networks. Here is the full picture."
      />

      <div className={styles.pullquote}>
        "B.Tech in Computer Science. MBA. Network Engineer. Co-founder. Currently doing a DevOps
        bootcamp at Leapfrog Connect while running a production home lab. Every chapter built
        something real — technical depth, business thinking, operational experience.
        Now bringing it all together."
      </div>

      <section className={styles.timelineSection}>
        <div className={styles.timelineLabel}>// timeline</div>
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={i} className={`${styles.entry} ${item.highlight ? styles.highlight : ''} ${item.current ? styles.current : ''}`}>
              <div className={styles.entryLeft}>
                <div className={`${styles.dot} ${styles[`dot_${item.color}`]}`} />
                {i < timeline.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.entryContent}>
                <div className={styles.period}>{item.period}</div>
                <div className={styles.entryTitle}>{item.title}</div>
                <div className={styles.entrySub}>{item.sub}</div>
                <p className={styles.entryNote}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.sectionLabel}>// why devops & cloud</div>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>01</div>
            <div className={styles.whyTitle}>Already running production infrastructure</div>
            <p className={styles.whyText}>My home lab runs Proxmox, OPNsense with VLAN segmentation, Docker Compose services, Cloudflare Tunnel, and Tailscale mesh VPN — 24/7. This site is self-hosted on my own hardware. That is DevOps at home scale.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>02</div>
            <div className={styles.whyTitle}>Structured learning on top of real experience</div>
            <p className={styles.whyText}>The Leapfrog Connect DevOps bootcamp is formalising what I already do — Jenkins CI/CD, Kubernetes, AWS. I am not learning Docker for the first time. I am learning to orchestrate it at scale.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>03</div>
            <div className={styles.whyTitle}>Business thinking built in</div>
            <p className={styles.whyText}>MBA and one year co-founding a company means I understand infrastructure decisions beyond the technical layer. Cost, reliability, scalability — I think about all three when I build systems.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
