import styles from './index.module.scss'
import { WindowVirtualizer } from 'virtua'
import { pages } from './constants.js'

type Props = {
  type?: string
}

function PageSpeed({ type }: Props) {
  const lighthouses = pages[type]

  const spLighthouses = lighthouses.map(l => {
    const key = l
    .replaceAll('https://event.rakuten.co.jp/', '')
    .replaceAll('/', '_')
    
    return `${key}_sp.html`
  })

  const pcLighthouses = lighthouses.map(l => {
    const key = l
    .replaceAll('https://event.rakuten.co.jp/', '')
    .replaceAll('/', '_')
    
    return `${key}_pc.html`
  })

  return (
    <div className={styles['root']}>
      <WindowVirtualizer>
        {spLighthouses.map((l, index) => {
          return (
            <div key={l}>
              <div className={styles['iframe-grid']}>
                <span className={styles['iframe-grid-title']}>{l}</span>
                <div>
                  <iframe
                    className={styles['iframe']}
                    loading='lazy'
                    src={`/archives/${type}/old/${l}`}
                  />
                </div>
                <div>
                  <iframe
                    className={styles['iframe']}
                    loading='lazy'
                    src={`/archives/${type}/new/${l}`}
                  />
                </div>

                <span className={styles['iframe-grid-title']}>{pcLighthouses[index]}</span>
                <div>
                  <iframe
                    className={styles['iframe']}
                    loading='lazy'
                    src={`/archives/${type}/old/${pcLighthouses[index]}`}
                  />
                </div>
                <div>
                  <iframe
                    className={styles['iframe']}
                    loading='lazy'
                    src={`/archives/${type}/new/${pcLighthouses[index]}`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </WindowVirtualizer>
    </div>
  )
}

export default PageSpeed
