import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import axios from 'axios'
import styles from './BlogPost.module.css'

const PLACEHOLDER = {
  'opnsense-vlans-proxmox': {
    title: 'How I set up OPNsense with VLANs on a Proxmox home lab',
    date: '2026-03-15',
    tags: ['networking', 'proxmox', 'opnsense', 'homelab'],
    content: `## The problem

Running a flat network at home means everything can talk to everything. Your IoT devices, your servers, your personal laptop — all on the same subnet. That's fine until it isn't.

I wanted proper segmentation: trusted devices on one VLAN, servers on another, IoT isolated, guests completely sandboxed.

## The setup

My host machine is an HP Envy m6 running Proxmox VE 9.1.4. OPNsense runs as VM 100 with four virtual interfaces mapped to VLANs.

\`\`\`
VLAN 10 — Trusted   10.10.10.0/24   Full access
VLAN 20 — IoT       10.10.20.0/24   Internet only
VLAN 30 — Servers   10.10.30.0/24   Internet only, isolated from LAN
VLAN 40 — Guest     10.10.40.0/24   Internet only, fully sandboxed
\`\`\`

## The double NAT problem

Worldlink gives no PPPoE credentials. My OPNsense WAN gets a DHCP lease from the ISP gateway at 192.168.1.254. That means I'm double-NATted with no way to port forward from the outside.

**Solution: Cloudflare Tunnel.**

No port forwarding needed. The \`cloudflared\` daemon on my Ubuntu server creates an outbound tunnel to Cloudflare, which proxies all public traffic inward. Every service gets HTTPS automatically.

## Firewall rules

OPNsense firewall rules are explicit-deny by default. I added:

- LAN → anywhere: **allow**
- IoT → RFC1918: **block** (allows internet, blocks all private ranges)
- Servers → LAN: **block**
- Guest → RFC1918: **block**

The order matters. Block rules come before any allow rules.

## What I learned

Proper VLAN segmentation forces you to think like a security engineer. Every rule you write is a decision about trust. It's the same mental model you need for enterprise firewall work — just at home scale.
`,
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${slug}`)
        setPost(res.data)
      } catch {
        setPost(PLACEHOLDER[slug] || null)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) return <main className={styles.main}><div className={styles.loading}>// loading...</div></main>
  if (!post)   return <main className={styles.main}><div className={styles.notFound}>// post not found. <Link to="/blog" className={styles.back}>← back to blog</Link></div></main>

  return (
    <main className={styles.main}>
      <Link to="/blog" className={styles.backLink}>← ./blog</Link>

      <div className={styles.header}>
        <div className={styles.meta}>
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        {post.tags && (
          <div className={styles.tags}>
            {post.tags.map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
          </div>
        )}
      </div>

      <article className={styles.content}>
	<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </main>
  )
}
