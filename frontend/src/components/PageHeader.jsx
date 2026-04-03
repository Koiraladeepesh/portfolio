import styles from './PageHeader.module.css'

export default function PageHeader({ label, title, subtitle }) {
  return (
    <div className={styles.header}>
      <div className={styles.label}>{label}</div>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
