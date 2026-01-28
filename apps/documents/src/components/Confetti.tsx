import CanvasConfetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'

function useInterval(callback: () => void, delay: number, enabled: boolean) {
  const savedCallback = useRef<() => void>(callback)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const func = () => savedCallback.current()
    const id = setInterval(func, delay)
    return () => clearInterval(id)
  }, [enabled, delay])
}

const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function Confetti() {
  const [running, setRunning] = useState(false)

  useInterval(
    () => {
      const particleCount = 50
      CanvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      CanvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    },
    250,
    running
  )

  const onClick = () => {
    setRunning(true)
  }

  return (
    <button
      onClick={onClick}
      style={{ border: 0, backgroundColor: 'transparent', fontSize: '32px', cursor: 'pointer' }}
    >
      🎉
    </button>
  )
}
