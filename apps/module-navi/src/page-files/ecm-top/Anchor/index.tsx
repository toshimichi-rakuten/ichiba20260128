import { ReactNode } from 'react'
import Link from 'next/link'

import styles from './index.module.scss'

export type AnchorType = 'text' | 'default'

function ArrowIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.707 2L5 2.707L10.793 8.5L5 14.293L5.707 15L12.207 8.5L5.707 2Z'
        fill='#333333'
      />
    </svg>
  )
}

interface Props {
  type: AnchorType
  children: ReactNode
  href: string
  style: object
}

export function Anchor({ type = 'default', children, href, style }: Props) {
  const classes = {
    text: styles['anchor-type-text'],
    default: styles['anchor-type-default'],
  }
  return (
    <Link
      href={href}
      className={`${styles['anchor']} ${classes[type]}`}
      style={style}
    >
      <div className={`${styles['anchor-text']}`}>{children}</div>
      <div className={`${styles['anchor-icon']}`}>
        <ArrowIcon />
      </div>
    </Link>
  )
}

export default Anchor
