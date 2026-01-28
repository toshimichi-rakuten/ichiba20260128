import { PasswordInput } from '@mantine/core'
import { useState, ReactNode, ChangeEvent } from 'react'

const sessionStorageKey = '20250730PasswordView'

export function PasswordView({ children }: { children: ReactNode }) {
  const [visible, setIsVisible] = useState<boolean>(false)

  const wind = global?.window

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'supersale') {
      setIsVisible(true)

      if (wind) {
        wind.sessionStorage.setItem(sessionStorageKey, 'true')
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return <div>{children}</div>
  }

  if (wind && wind.sessionStorage.getItem(sessionStorageKey) === 'true') {
    return <div>{children}</div>
  }

  return (
    <>
      {visible ? (
        <div>{children}</div>
      ) : (
        <PasswordInput
          style={{
            width: '300px',
          }}
          placeholder='Password'
          onChange={onChange}
        />
      )}
    </>
  )
}
