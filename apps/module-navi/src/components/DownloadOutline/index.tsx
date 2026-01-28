import styles from './index.module.scss'
import { addBasePath } from 'src/utils'

export function DownloadOutline() {
  return (
    <a
      href={addBasePath(`/_assets/outline/${process.env.NEXT_PUBLIC_LATEST_RELEASE_DATE}_outline.zip`)}
      className={styles['download']}
      download
    >
      <div className={styles['download-icon']}>
        <DownloadIcon />
      </div>
      <span className={styles['download-text']}>最新アウトラインファイル</span>
    </a>
  )
}

function DownloadIcon() {
  return (
    <svg
      width='14'
      height='12'
      viewBox='0 0 14 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.75 1.1875H5.25V0.3125H8.75V1.1875ZM7.31768 8.92108L10.5001 5.56239H8.75005V2.06239H5.25005V5.56239H3.50005L6.6728 8.92021C6.84562 9.10964 7.14399 9.11008 7.31768 8.92108ZM12.25 8.1875V10.375H1.75V8.1875H0.875V10.375C0.875 10.8562 1.26875 11.25 1.75 11.25H12.25C12.7312 11.25 13.125 10.8562 13.125 10.375V8.1875H12.25Z'
        fill='currentColor'
      />
    </svg>
  )
}
