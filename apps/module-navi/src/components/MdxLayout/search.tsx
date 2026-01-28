import { useEffect, useState, useRef, useContext } from 'react'
import { Modal } from '@mantine/core'
import styles from './search.module.scss'
import { ecmToc, scmToc, dealToc, dealAlcorToc } from 'src/toc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutContext } from '.'
import { toKatakana, toHiragana } from 'wanakana'

function SearchIcon() {
  return (
    <svg
      width='15'
      height='14'
      viewBox='0 0 15 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.3441 13.163L10.6704 9.51087C11.5985 8.4837 12.1399 7.19022 12.1399 5.70652C12.1399 2.54891 9.54895 0 6.33928 0C3.09094 0 0.5 2.54891 0.5 5.70652C0.5 8.86413 3.09094 11.413 6.30061 11.413C7.65408 11.413 8.89154 10.9565 9.89698 10.1957L13.6094 13.8478C13.7254 13.962 13.8414 14 13.9574 14C14.0734 14 14.2281 13.962 14.3054 13.8478C14.5375 13.6957 14.5761 13.3533 14.3441 13.163ZM1.54411 5.70652C1.54411 3.11957 3.671 1.02717 6.30061 1.02717C8.93021 1.02717 11.0958 3.11957 11.0958 5.74457C11.0958 8.33152 8.96889 10.462 6.30061 10.462C3.671 10.4239 1.54411 8.33152 1.54411 5.70652Z'
        fill='currentColor'
      />
    </svg>
  )
}

function compareString(left?: string, right?: string) {
  if (!left || !right) {
    return false
  }

  const normalValid = left.toLowerCase().includes(right.toLowerCase())

  if (normalValid) {
    return true
  }

  const hiraganaValid = toHiragana(left, { convertLongVowelMark: false }).toLowerCase().includes(right.toLowerCase())

  if (hiraganaValid) {
    return true
  }

  return toKatakana(left, { convertLongVowelMark: false }).toLowerCase().includes(right.toLowerCase())
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState<null | number>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')
  const router = useRouter()
  const { type } = useContext(LayoutContext)

  const tocMap = {
    ecm: ecmToc,
    scm: scmToc,
    // Due to formatting issues, they are separated.
    deal: [...dealAlcorToc, ...dealToc],
  }

  const searchToc = tocMap[type].filter((t) => !t.deprecated)

  const filteredToc = input
    ? searchToc.filter((t) => {
        return (
          compareString(t.title, input) ||
          compareString(t.subtitle, input) ||
          compareString(t.description, input) ||
          compareString(t.url.replaceAll('-', ' ').replaceAll('/', ' '), input) ||
          t.tags?.some((t) => compareString(t, input))
        )
      })
    : searchToc

  const modalItems = filteredToc.slice(0, 8)

  const onInputChange = (e) => {
    setInput(e.target.value)

    if (e.target.value) {
      setFocus(0)
    } else {
      setFocus(null)
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        if (open) {
          inputRef.current?.focus()
        } else {
          setOpen(true)
        }
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open])

  useEffect(() => {
    if (focus == null) {
      return
    }

    const focusedItem = modalItems[focus]
    if (!focusedItem) {
      return
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        setOpen(false)
        router.push(focusedItem.url)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [modalItems, focus, router])

  useEffect(() => {
    if (!open) {
      return
    }

    const next = () => {
      if (!modalItems) {
        return
      }

      if (focus == null) {
        setFocus(0)
        return
      }

      const nextFocus = focus + 1

      if (nextFocus > modalItems.length - 1) {
        setFocus(0)
      } else {
        setFocus(nextFocus)
      }
    }

    const prev = () => {
      if (!modalItems) {
        return
      }

      if (focus == null) {
        setFocus(modalItems.length - 1)
        return
      }

      const nextFocus = focus - 1

      if (nextFocus < 0) {
        setFocus(modalItems.length - 1)
      } else {
        setFocus(nextFocus)
      }
    }

    const down = (e: KeyboardEvent) => {
      if (e.key == 'ArrowDown') {
        e.preventDefault()
        next()
      } else if (e.key == 'ArrowUp') {
        e.preventDefault()
        prev()
      } else if (e.key == 'n' && e.ctrlKey) {
        e.preventDefault()
        next()
      } else if (e.key == 'p' && e.ctrlKey) {
        e.preventDefault()
        prev()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [modalItems, open, focus])

  // Closing, reset state.
  useEffect(() => {
    if (!open) {
      setFocus(null)
      setInput('')
    }
  }, [open])

  const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false
  const shortcutKey = isMac ? '⌘' : 'CTRL'

  const highlightSearch = (text: string) => {
    const inputIndex = text.toLowerCase().indexOf(input.toLowerCase())

    if (inputIndex == -1 || !input.length) {
      return <span>{text}</span>
    }

    const head = text.slice(0, inputIndex)
    const strong = text.slice(inputIndex, inputIndex + input.length)
    const tail = text.slice(inputIndex + input.length, text.length)

    return (
      <div>
        {head}
        <span style={{ backgroundColor: 'yellow' }}>{strong}</span>
        {tail}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={styles['sidebar-search']}
      >
        <SearchIcon />
        <span className={styles['text']}>キーワード／原稿タイプID</span>
        <span
          suppressHydrationWarning
          className={styles['shortcut']}
        >
          {shortcutKey} + /
        </span>
      </button>

      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        centered
        overlayBlur={3}
        overlayOpacity={0.5}
        size='auto'
        transition='pop'
        transitionDuration={100}
        transitionTimingFunction='linear'
      >
        <div className={styles['modal']}>
          <button
            className={styles['modal-close']}
            onClick={() => setOpen(false)}
          >
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
                d='M1.74068 0.503463L0.50324 1.7409L5.76234 7L0.503239 12.2591L1.74068 13.4965L6.99978 8.23744L12.2589 13.4966L13.4963 12.2591L8.23721 7L13.4963 1.74088L12.2589 0.503448L6.99978 5.76256L1.74068 0.503463Z'
                fill='#8F8F8F'
              />
            </svg>
          </button>

          <div className={styles['modal-input-wrapper']}>
            <input
              data-autofocus
              ref={inputRef}
              onFocus={() => setFocus(null)}
              onChange={onInputChange}
              placeholder='キーワード・原稿タイプIDから探す'
            />
            <SearchIcon />
          </div>

          <div className={styles['modal-item-wrapper']}>
            {modalItems.map((m, index) => (
              <Link
                tabIndex={-1}
                key={m.url}
                href={m.url}
                className={index == focus ? `${styles['modal-item']} ${styles['focused']}` : styles['modal-item']}
                onClick={() => {
                  setOpen(false)
                }}
              >
                <span className={styles['modal-item-title']}>
                  {typeof highlightSearch(m.title) === 'string'
                    ? highlightSearch(m.title)
                    : highlightSearch(m.title).props.children}
                  {m.subtitle ? m.subtitle : ''}
                </span>
                {m.description ? <span>{highlightSearch(m.description)}</span> : ''}
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
