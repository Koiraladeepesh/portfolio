import styles from './Terminal.module.css'

export default function Terminal({ title = 'bash', lines = [], className = '' }) {
  return (
    <div className={`${styles.terminal} ${className}`}>
      <div className={styles.topbar}>
        <div className={`${styles.dot} ${styles.red}`} />
        <div className={`${styles.dot} ${styles.yellow}`} />
        <div className={`${styles.dot} ${styles.green}`} />
        <span className={styles.title}>deepesh@homelab — {title}</span>
      </div>
      <div className={styles.body}>
        {lines.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type] || ''}`}>
            {line.type === 'cmd' && <span className={styles.prompt}>~$</span>}
            {line.type === 'cmd'
              ? <span className={styles.cmd}> {line.text}</span>
              : <span dangerouslySetInnerHTML={{ __html: line.text }} />
            }
          </div>
        ))}
        <div className={styles.line}>
          <span className={styles.prompt}>~$</span>
          <span className={styles.cursor} />
        </div>
      </div>
    </div>
  )
}
