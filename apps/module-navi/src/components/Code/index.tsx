import { addClassToHast, codeToHtml } from 'shikiji'
import { useState, useEffect } from 'react'
import styles from './index.module.scss'
import copy from 'copy-to-clipboard'

export type Language = 'javascript' | 'js' | 'typescript' | 'ts' | 'html' | 'css'

function useClipboard(content: string): [NodeJS.Timeout | undefined, () => void] {
  const [clicked, setClicked] = useState<NodeJS.Timeout | undefined>(undefined)

  const write = () => {
    if (clicked) {
      clearTimeout(clicked)
    }

    const id = setTimeout(() => {
      clearTimeout(clicked)
      setClicked(undefined)
    }, 1000)

    setClicked(id)
  }

  useEffect(() => {
    if (!clicked) {
      return
    }

    copy(content)
  }, [clicked, content])

  return [clicked, write]
}

function useShikiji(content: string, language: Language, preClass: string, highlighted: number[]) {
  const [colored, setColored] = useState('')

  useEffect(() => {
    const func = async () => {
      const html = await codeToHtml(content, {
        lang: language,
        theme: 'github-light',
        transformers: [
          {
            pre(node) {
              addClassToHast(node, preClass)
              node.properties.style = "background-color: #f7f7f7; font-family: 'JetBrains Mono'"
            },
            line(node, line) {
              if (highlighted.includes(line)) {
                addClassToHast(node, styles['highlighted'])
              }
            },
          },
        ],
      })

      setColored(html)
    }

    func()
  }, [content, language, preClass])

  return colored
}

function Code({
  content,
  language = 'html',
  full,
  copy = true,
  highlighted = [],
}: {
  content: string
  language?: Language
  full?: boolean
  copy?: boolean
  highlighted?: number[]
}) {
  const preClass = full ? `${styles['code-pre']} ${styles['full']}` : `${styles['code-pre']}`

  const trimmed = content.trim()
  const colored = useShikiji(trimmed, language, preClass, highlighted)
  const [copied, write] = useClipboard(trimmed)

  return (
    <form
      className={styles['form']}
      onSubmit={(e) => {
        e.preventDefault()
        write()
      }}
    >
      {copy ? (
        <button
          type='submit'
          className={styles['copy']}
        >
          <ClipIcon /> <span>{copied ? 'コピーされました！' : 'コピー'}</span>
        </button>
      ) : null}
      {colored ? (
        <div dangerouslySetInnerHTML={{ __html: colored }} />
      ) : (
        <div>
          <pre className={`${preClass} ${styles['loading']}`}>
            <code>{trimmed}</code>
          </pre>
        </div>
      )}
    </form>
  )
}

function ClipIcon() {
  return (
    <svg
      width='14'
      height='12'
      viewBox='0 0 14 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.42759 6.49227L7.52118 3.41986C8.2046 2.74112 9.31263 2.74112 9.99605 3.41986C10.6795 4.0986 10.6795 5.19905 9.99605 5.87779L5.35567 10.4864C4.33054 11.5045 2.66848 11.5045 1.64336 10.4864C0.61823 9.46831 0.61823 7.81763 1.64336 6.79952L7.14995 1.33061C8.51678 -0.02687 10.7329 -0.02687 12.0997 1.33061C13.4665 2.68809 13.4665 4.889 12.0997 6.24648L8.1399 10.1792L7.52118 9.56469L11.481 5.632C12.5061 4.61389 12.5061 2.9632 11.481 1.94509C10.4559 0.926984 8.79379 0.926984 7.76867 1.94509L2.26207 7.414C1.57866 8.09274 1.57866 9.19319 2.26207 9.87193C2.94549 10.5507 4.05353 10.5507 4.73695 9.87193L9.37733 5.26331C9.71904 4.92394 9.71904 4.37371 9.37733 4.03434C9.03563 3.69497 8.48161 3.69497 8.1399 4.03434L5.04631 7.10676L4.42759 6.49227Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Code
