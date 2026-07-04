import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY
    const update = () => {
      const y = window.scrollY
      setScrollY(y)
      setScrollDir(y > lastY && y > 80 ? 'down' : 'up')
      lastY = y
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { scrollDir, scrollY }
}
