import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/about',      label: './about'      },
  { to: '/lab',        label: './lab'        },
  { to: '/experience', label: './experience' },
  { to: '/blog',       label: './blog'       },
  { to: '/goals',      label: './goals'      },
  { to: '/contact',    label: './contact'    },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        dk<span>@homelab</span>
      </Link>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${styles.link} ${pathname === to ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <div className={styles.status}>
          <span className={styles.dot} />
          lab online
        </div>
        <button
          className={styles.burger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
