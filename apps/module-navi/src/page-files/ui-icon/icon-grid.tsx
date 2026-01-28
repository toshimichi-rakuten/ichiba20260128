import { basicIcons, outlinedIcons, filledIcons, genreIcons } from './icons'
import style from './icon-grid.module.scss'
import copy from 'copy-to-clipboard'
import { KeyboardEvent, ReactNode, useState, createContext, useContext } from 'react'
import { mergeClassNames } from 'ecm/src/_utils'

const GridIconContext = createContext({
  copied: '',
  time: null,
  setCopied: (_value: string) => {},
  setTime: (_id: any) => {},
})

type CopyIconProps = {
  icon: string
  content: string
  children: ReactNode
}

export function CopyIcon({ icon, content, children }: CopyIconProps) {
  const { copied, time, setTime, setCopied } = useContext(GridIconContext)

  const onCopy = () => {
    copy(content)
    setCopied(icon)

    if (time) {
      clearTimeout(time)
    }

    const id = setTimeout(() => {
      setCopied('')
    }, 1000)

    setTime(id)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onCopy()
    }
  }

  return (
    <button
      onKeyDown={(e) => onKeyDown(e)}
      onClick={onCopy}
      className={mergeClassNames(style['grid-button'])}
    >
      {copied === icon ? (
        <span>コピーされました！</span>
      ) : (
        <>
          <div className={style['children']}>{children}</div>
          <span className={style['copy']}>コピー</span>
        </>
      )}
    </button>
  )
}

export function IconGridProvider({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState('')
  const [time, setTime] = useState(null)

  return <GridIconContext.Provider value={{ copied, time, setTime, setCopied }}>{children}</GridIconContext.Provider>
}

function IconGrid({ type = 'basic' }: { type: 'basic' | 'outlined' | 'filled' | 'genre' }) {
  const icons = {
    basic: basicIcons,
    outlined: outlinedIcons,
    filled: filledIcons,
    genre: genreIcons
  }

  return (
    <IconGridProvider>
      <div className={style['grid']}>
        {icons[type].map((icon) => (
          <div
            key={icon}
            className={style['grid-item']}
          >
            <CopyIcon
              icon={icon}
              content={`<i aria-hidden="true" class="${icon}"></i>`}
            >
              <i
                aria-hidden='true'
                className={icon}
              ></i>
            </CopyIcon>
            <p className={style['grid-label']}>{icon}</p>
          </div>
        ))}
      </div>
    </IconGridProvider>
  )
}

export default IconGrid
