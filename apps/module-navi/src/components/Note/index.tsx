import { ReactNode } from 'react'

import styles from './index.module.scss'

export type NoteType = 'info' | 'warn' | 'error' | 'default'

function WarnIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 5C6.586 5 6.25 4.664 6.25 4.25C6.25 3.836 6.586 3.5 7 3.5C7.414 3.5 7.75 3.836 7.75 4.25C7.75 4.664 7.414 5 7 5ZM6.5 10.5H7.5V6H6.5V10.5ZM7 0C3.134 0 0 3.134 0 7C0 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7 0Z'
        fill='#FFB238'
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 5C6.586 5 6.25 4.664 6.25 4.25C6.25 3.836 6.586 3.5 7 3.5C7.414 3.5 7.75 3.836 7.75 4.25C7.75 4.664 7.414 5 7 5ZM6.5 10.5H7.5V6H6.5V10.5ZM7 0C3.134 0 0 3.134 0 7C0 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7 0Z'
        fill='#4DC4FF'
      />
    </svg>
  )
}

function DefaultIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 6C7.586 6 7.25 5.664 7.25 5.25C7.25 4.836 7.586 4.5 8 4.5C8.414 4.5 8.75 4.836 8.75 5.25C8.75 5.664 8.414 6 8 6ZM7.5 11.5H8.5V7H7.5V11.5ZM8 1C4.134 1 1 4.134 1 8C1 11.866 4.134 15 8 15C11.866 15 15 11.866 15 8C15 4.134 11.866 1 8 1Z'
        fill='black'
        fillOpacity='0.3'
      />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.99986 12C7.58586 12 7.24986 11.664 7.24986 11.25C7.24986 10.836 7.58586 10.5 7.99986 10.5C8.41386 10.5 8.74986 10.836 8.74986 11.25C8.74986 11.664 8.41386 12 7.99986 12ZM7.49986 9.5H8.49986V5H7.49986V9.5ZM14.9099 12.9685L8.62486 1.86C8.48936 1.62 8.24436 1.5 7.99986 1.5C7.75536 1.5 7.51036 1.62 7.37486 1.86L1.08986 12.9685C0.827363 13.432 1.17136 14 1.71486 14H14.2849C14.8284 14 15.1724 13.432 14.9099 12.9685Z'
        fill='#DF0101'
      />
    </svg>
  )
}

interface Props {
  type: NoteType
  children: ReactNode
}

function Note({ type = 'info', children }: Props) {
  const icons = {
    info: InfoIcon,
    error: ErrorIcon,
    warn: WarnIcon,
    default: DefaultIcon,
  }

  const Icon = icons[type]

  const classes = {
    info: styles['info'],
    warn: styles['warn'],
    error: styles['error'],
    default: styles['default'],
  }

  return (
    <div className={`${styles['note']} ${classes[type]}`}>
      <Icon />
      <div className={styles['content']}>{children}</div>
    </div>
  )
}

export default Note
