import PageHeader from '../components/PageHeader.jsx'
import styles from './About.module.css'

const timeline = [
  {
    period: '2020',
    title: 'B.Tech Computer Science & Engineering',
    sub: 'Graduated · 4-year CS foundation',
    note: 'The technical base everything else builds on.',
    color: 'green',
  },
  {
    period: 'Jan–Dec 2022',
    title: 'Network & System Engineer — iDream Technologies',
    sub: 'Thapathali, Kathmandu · while completing Masters simultaneously',
    note: 'My first real engineering role. Hands-on routing, switching, systems. I was good at it. I left. I regret it.',
    color: 'cyan',
    highlight: true,
  },
  {
    period: 'Oct 2021–Oct 2023',
    title: 'Masters in Business Management',
    sub: 'Coursework completed · ran alongside the engineering job',
    note: 'Studied and worked full-time simultaneously. Learned the business side of technology.',
    color: 'purple',
  },
  {
    period: 'Oct 2023–Dec 2024',
    title: 'Freelance IT + MBA Thesis',
    sub: 'Independent consulting · research · self-directed',
    note: 'Completed postgrad research while taking freelance engagements. Not idle — just building differently.',
    color: 'dim',
  },
  {
    period: 'Dec 2024–Dec 2025',
    title: 'Co-founder — Rojgar Sutra',
    sub: 'HR company · with my wife · ran for 1 year',
    note: 'Built a real business from scratch. Managed operations, hiring, client relationships. It didn\'t scale. We closed it. I learned more that year than any classroom taught me.',
    color: 'warn',
  },
  {
    period: 'Mar–Dec 2025',
    title: 'Australia Masters Application + Thesis Completion',
    sub: 'ICT Research application · MBA thesis submitted mid-2025',
    note: 'Applied for a research Masters while running a startup and finishing a thesis. Strong profile. Still rejected.',
    color: 'dim',
  },
  {
    period: 'Dec 2025',
    title: 'Visa rejected. Startup closed. Same month.',
    sub: 'Two things failing at once.',
    note: 'This was the lowest point. And the most clarifying. I knew exactly what I wanted to do next.',
    color: 'error',
  },
  {
    period: 'Jan 2026 →',
    title: 'IT Officer — River Group',
    sub: 'Multi-company IT ownership · building home lab at night',
    note: 'The day job keeps me moving. The lab keeps me sharp. CCNA next. Then security. The plan is clear.',
    color: 'green',
    current: true,
  },
]

export default function About() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// my story"
        title="The long way back_"
        subtitle="I took a detour. A startup. A visa rejection. A year I didn't plan for. But the destination never changed."
      />

      <div className={styles.pullquote}>
        "My first real job was as a Network Engineer. I left to chase something bigger.
        A Masters abroad. A startup with my wife. Neither worked out.
        I regret leaving networking. So I'm clawing my way back — one lab build at a time."
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
        <div className={styles.sectionLabel}>// why networking & security</div>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>01</div>
            <div className={styles.whyTitle}>It's where I came alive</div>
            <p className={styles.whyText}>At iDream, I was the most engaged I'd ever been professionally. Diagnosing network issues, building infrastructure, owning systems — it didn't feel like work. Leaving was the mistake I think about most.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>02</div>
            <div className={styles.whyTitle}>I never stopped building</div>
            <p className={styles.whyText}>While working as IT Officer, I built a Proxmox cluster at home. Set up OPNsense with proper VLAN segmentation. Self-hosted 4 services behind a Cloudflare tunnel. The lab runs 24/7. That's not a hobby — that's who I am.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNum}>03</div>
            <div className={styles.whyTitle}>Security is the next logical step</div>
            <p className={styles.whyText}>You can't build a properly segmented network without thinking like an attacker. Every firewall rule I write, every VLAN I isolate — that's security thinking. I want to go deeper. CTFs, CCNA, then security certifications.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
