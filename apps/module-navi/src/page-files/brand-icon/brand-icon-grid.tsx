import style from 'src/page-files/ui-icon/icon-grid.module.scss'
import { logo, sns, ichiba } from './image-list'
import { CopyIcon, IconGridProvider } from 'src/page-files/ui-icon/icon-grid'

function ImageGrid({ type }: { type: 'logo' | 'sns' | 'ichiba' }) {
  const icons = {
    logo,
    sns,
    ichiba,
  }

  const createImage = (url: string) => {
    return `
      <img src="${url}" />
    `
  }

  return (
    <IconGridProvider>
      <div className={style['grid']}>
        {icons[type].map(([icon, imageUrl]) => (
          <div
            key={icon}
            className={style['grid-item']}
          >
            <CopyIcon
              icon={icon}
              content={createImage(imageUrl)}
            >
              <div dangerouslySetInnerHTML={{ __html: createImage(imageUrl) }} />
            </CopyIcon>
            <p className={style['grid-label']}>{icon}</p>
          </div>
        ))}
      </div>
    </IconGridProvider>
  )
}

export default ImageGrid
