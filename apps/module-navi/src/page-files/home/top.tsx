import Link from 'next/link'
import styles from './top.module.scss'

export function Top() {
  return (
    <div
      style={{
        margin: 'auto',
        width: '768px',
        padding: '32px',
      }}
    >
      <h1
        style={{
          marginBottom: '48px',
          fontSize: '32px',
        }}
      >
        CWD Front End Team Projects
      </h1>

      <h2
        style={{
          fontSize: '24px',
          marginBottom: '24px',
        }}
      >
        Libraries
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(auto, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}
      >
        <Link
          className={styles['card']}
          href='/ecm/docs'
        >
          ECM
        </Link>
        <Link
          className={styles['card']}
          href='/scm/docs'
        >
          SCM
        </Link>
        <Link
          className={styles['card']}
          href='/deal/docs'
        >
          DEAL
        </Link>
      </div>
    </div>
  )
}
