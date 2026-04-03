import { useState, useEffect } from 'react'
import styles from './StatusBar.module.css'

export default function StatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ktm = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now)
      setTime(ktm)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.dot} />
        deepeshkoirala.com.np
      </div>
      <div className={styles.item}>KTM {time} · UTC+5:45</div>
      <div className={styles.item}>open to opportunities</div>
    </div>
  )
}
