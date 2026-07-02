import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 lg:bottom-6 right-6 z-40 p-3 bg-forest text-white rounded-full shadow-lg
                 hover:bg-green-800 transition-all duration-200 animate-fade-in"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
