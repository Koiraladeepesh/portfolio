import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageHeader from '../components/PageHeader.jsx'
import styles from './Blog.module.css'

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    slug: 'opnsense-vlans-proxmox',
    title: 'How I set up OPNsense with VLANs on a Proxmox home lab',
    excerpt: 'A step-by-step walkthrough of building a proper VLAN-segmented network on a single machine — including the double NAT problem with Worldlink and how Cloudflare Tunnel solved it.',
    date: '2026-03-15',
    tags: ['networking', 'proxmox', 'opnsense', 'homelab'],
    readTime: '8 min',
  },
  {
    id: 2,
    slug: 'visa-rejection-and-resilience',
    title: 'What getting rejected for an Australian student visa taught me',
    excerpt: 'I had a strong profile. A research proposal. A plan. Then December 2025 happened. This is what I learned about resilience, identity, and what you do when the plan falls apart.',
    date: '2026-02-20',
    tags: ['personal', 'career', 'resilience'],
    readTime: '5 min',
  },
  {
    id: 3,
    slug: 'ccna-study-plan-2026',
    title: 'My CCNA study plan — preparing while working full time',
    excerpt: 'How I\'m structuring CCNA preparation around a full-time job and a home lab that doubles as my study environment. Resources, schedule, and what actually works.',
    date: '2026-02-05',
    tags: ['ccna', 'studying', 'networking', 'career'],
    readTime: '6 min',
  },
]

export default function Blog() {
  const [posts, setPosts] = useState(PLACEHOLDER_POSTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/posts')
        if (res.data && res.data.length > 0) {
          setPosts(res.data)
        }
      } catch {
        // Use placeholder posts if API unavailable
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <main className={styles.main}>
      <PageHeader
        label="// blog"
        title="Writing_"
        subtitle="Technical writeups, career notes, and honest reflections. Everything here is real."
      />

      {loading && <div className={styles.loading}>// loading posts...</div>}

      <div className={styles.postList}>
        {posts.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className={styles.postCard}>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span className={styles.postRead}>{post.readTime} read</span>
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <div className={styles.postTags}>
              {post.tags.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
            <div className={styles.postArrow}>./read_post ↗</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
