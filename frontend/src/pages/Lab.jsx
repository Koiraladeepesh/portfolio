import PageHeader from '../components/PageHeader.jsx'
import Terminal from '../components/Terminal.jsx'
import styles from './Lab.module.css'

const services = [
  { name: 'AdGuard Home',      port: '3000', url: 'adguard.deepeshkoirala.com.np',   status: 'online', desc: 'Network-wide DNS ad blocking'         },
  { name: 'Nginx Proxy Manager', port: '81', url: 'NPM (internal)',                  status: 'online', desc: 'Reverse proxy for all services'        },
  { name: 'Nextcloud',         port: '8080', url: 'nextcloud.deepeshkoirala.com.np', status: 'online', desc: 'Self-hosted cloud storage'             },
  { name: 'Jellyfin',          port: '8096', url: 'jellyfin.deepeshkoirala.com.np',  status: 'online', desc: 'Media server — movies, TV, music'      },
  { name: 'Portfolio',         port: '8090', url: 'deepeshkoirala.com.np',           status: 'online', desc: 'This site — React + Node + Postgres'   },
]

const vlans = [
  { id: 10,  name: 'Trusted',  subnet: '10.10.10.0/24', color: 'green', rule: 'Full access → anywhere'              },
  { id: 20,  name: 'IoT',      subnet: '10.10.20.0/24', color: 'warn',  rule: 'Internet only · no LAN access'      },
  { id: 30,  name: 'Servers',  subnet: '10.10.30.0/24', color: 'cyan',  rule: 'Internet only · isolated from LAN'  },
  { id: 40,  name: 'Guest',    subnet: '10.10.40.0/24', color: 'dim',   rule: 'Internet only · fully isolated'     },
]

const termLines = [
  { type: 'cmd', text: 'docker ps --format "table {{.Names}}\\t{{.Status}}"' },
  { type: 'out', text: '<span style="color:var(--cyan)">NAMES</span>                  STATUS' },
  { type: 'out', text: '<span style="color:var(--green)">adguardhome</span>           Up 12 days' },
  { type: 'out', text: '<span style="color:var(--green)">nginx-proxy-manager</span>   Up 12 days' },
  { type: 'out', text: '<span style="color:var(--green)">nextcloud</span>             Up 12 days' },
  { type: 'out', text: '<span style="color:var(--green)">jellyfin</span>              Up 12 days' },
  { type: 'out', text: '<span style="color:var(--green)">portfolio-frontend</span>    Up 3 days' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: 'tailscale status' },
  { type: 'out', text: '<span style="color:var(--green)">100.85.210.46</span>   proxmox-host    online' },
  { type: 'out', text: '<span style="color:var(--green)">100.124.164.125</span> opnsense-vm     online' },
  { type: 'out', text: '<span style="color:var(--green)">100.93.27.94</span>    ubuntu-server   online' },
]

export default function Lab() {
  return (
    <main className={styles.main}>
      <PageHeader
        label="// home lab"
        title="The lab_"
        subtitle="A production-grade home network built on a single HP Envy m6. Running 24/7. This is my proof of work."
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// hardware</div>
        <div className={styles.hardwareCard}>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>host</span>
            <span className={styles.hwVal}>HP Envy m6 · i7 · 16GB RAM · 500GB SSD</span>
          </div>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>hypervisor</span>
            <span className={styles.hwVal}>Proxmox VE 9.1.4 · 192.168.1.10:8006</span>
          </div>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>firewall vm</span>
            <span className={styles.hwVal}>OPNsense (VM 100) · WAN + 4 VLAN interfaces</span>
          </div>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>server vm</span>
            <span className={styles.hwVal}>Ubuntu 24.04 LTS (VM 101) · 10.10.30.10 · all Docker services</span>
          </div>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>switch</span>
            <span className={styles.hwVal}>Ruijie RG-ES205GC · VLAN trunk + access ports</span>
          </div>
          <div className={styles.hwItem}>
            <span className={styles.hwKey}>isp</span>
            <span className={styles.hwVal}>Worldlink 120Mbps · double NAT · traversed via Cloudflare Tunnel</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// network segmentation — vlan design</div>
        <div className={styles.vlanGrid}>
          {vlans.map(v => (
            <div key={v.id} className={`${styles.vlanCard} ${styles[`vlan_${v.color}`]}`}>
              <div className={styles.vlanId}>VLAN {v.id}</div>
              <div className={styles.vlanName}>{v.name}</div>
              <div className={styles.vlanSubnet}>{v.subnet}</div>
              <div className={styles.vlanRule}>{v.rule}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// running services</div>
        <div className={styles.serviceTable}>
          <div className={styles.tableHeader}>
            <span>service</span>
            <span>port</span>
            <span>url</span>
            <span>status</span>
          </div>
          {services.map((s, i) => (
            <div key={i} className={styles.tableRow}>
              <div>
                <div className={styles.serviceName}>{s.name}</div>
                <div className={styles.serviceDesc}>{s.desc}</div>
              </div>
              <span className={styles.servicePort}>:{s.port}</span>
              <span className={styles.serviceUrl}>{s.url}</span>
              <span className={styles.statusBadge}>● {s.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// remote access</div>
        <Terminal title="ubuntu-server" lines={termLines} className={styles.terminal} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// what I learned building this</div>
        <div className={styles.lessonsGrid}>
          {[
            { title: 'Double NAT traversal',       body: 'Worldlink gives no PPPoE credentials and a double-NATted IP. Solved it with Cloudflare Tunnel — zero port forwarding needed, full HTTPS to every service.' },
            { title: 'Proper VLAN segmentation',   body: 'IoT, servers, guests, and trusted devices on separate VLANs with explicit firewall rules. Servers can reach the internet but not the LAN. IoT is fully isolated.' },
            { title: 'Self-hosted DNS',            body: 'AdGuard Home handles all DNS for the network with custom upstream resolvers and local overrides for internal domains.' },
            { title: 'Reverse proxy management',   body: 'Nginx Proxy Manager routes all external traffic from Cloudflare Tunnel to the correct container, handling SSL termination automatically.' },
          ].map((l, i) => (
            <div key={i} className={styles.lessonCard}>
              <div className={styles.lessonTitle}>{l.title}</div>
              <p className={styles.lessonBody}>{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>// what's next</div>
        <div className={styles.nextList}>
          {[
            'Ruijie switch VLAN port assignments (needs physical access)',
            'Huawei router as WiFi AP on VLAN 10 + VLAN 40',
            'Home IDS/IPS — Suricata or Snort on OPNsense',
            'Wazuh SIEM for centralized log monitoring',
            'First security CTF — HackTheBox or TryHackMe',
          ].map((item, i) => (
            <div key={i} className={styles.nextItem}>
              <span className={styles.nextArrow}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
