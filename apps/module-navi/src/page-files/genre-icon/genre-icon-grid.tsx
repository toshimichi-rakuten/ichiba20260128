import { genreSvg } from './genre-list'
import { CopyIcon, IconGridProvider } from 'src/page-files/ui-icon/icon-grid'
import style from 'src/page-files/ui-icon/icon-grid.module.scss'

function SvgIconGrid() {
  return (
    <IconGridProvider>
      <div className={style['grid']}>
        {genreSvg.map(([icon, svg]) => (
          <div
            key={icon}
            className={style['grid-item']}
          >
            <CopyIcon
              icon={icon}
              content={svg}
            >
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </CopyIcon>
            <p className={style['grid-label']}>{icon.replace('genre-icon-', '')}</p>
          </div>
        ))}
      </div>
    </IconGridProvider>
  )
}

export default SvgIconGrid
