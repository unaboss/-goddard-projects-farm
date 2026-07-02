import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    image: '/images/hero-1.jpeg',
    tag: 'Fresh From The Greenhouse',
    title: 'Tomatoes Grown\nWith Purpose',
    sub: 'Hand-selected, sun-ripened tomatoes straight from our covered growing fields.',
    cta: { label: 'View Tomatoes', to: '/vegetables' },
    ctaSecondary: { label: 'Contact Us', to: '/contact' },
    align: 'left',
  },
  {
    image: '/images/hero-2.jpeg',
    tag: 'Harvest Season',
    title: 'Every Tomato\nHand-Picked',
    sub: 'Our team carefully selects only the best produce — no shortcuts, no compromises.',
    cta: { label: 'Make an Inquiry', to: '/contact' },
    ctaSecondary: { label: 'Learn More', to: '/about' },
    align: 'center',
  },
  {
    image: '/images/hero-3.jpeg',
    tag: 'Our Team',
    title: 'The People Behind\nYour Food',
    sub: 'A dedicated team of farmers committed to sustainable, responsible agriculture.',
    cta: { label: 'About Us', to: '/about' },
    ctaSecondary: { label: 'Our Produce', to: '/vegetables' },
    align: 'right',
  },
  {
    image: '/images/hero-4.jpeg',
    tag: 'Inside The Greenhouse',
    title: 'Protected Growing\nFor Better Quality',
    sub: 'Our shade-net growing system produces cleaner, more consistent crops all year round.',
    cta: { label: 'View All Produce', to: '/vegetables' },
    ctaSecondary: { label: 'Our Services', to: '/services' },
    align: 'left',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setTimeout(() => advance(1), 5500)
    return () => clearTimeout(t)
  }, [current])

  const advance = (dir) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + slides.length) % slides.length)
  }

  const slide = slides[current]

  return (
    <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className={`max-w-7xl mx-auto px-6 lg:px-12 w-full flex ${slide.align === 'right' ? 'justify-end' : slide.align === 'center' ? 'justify-center text-center' : 'justify-start'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current + '-text'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block bg-gold-500/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                {slide.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5 whitespace-pre-line drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-white/85 text-lg mb-8 leading-relaxed max-w-xl">
                {slide.sub}
              </p>
              <div className={`flex flex-wrap gap-3 ${slide.align === 'center' ? 'justify-center' : ''}`}>
                <Link to={slide.cta.to} className="btn-gold">
                  {slide.cta.label} <ArrowRight size={16} />
                </Link>
                <Link to={slide.ctaSecondary.to} className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-forest transition-all duration-200 flex items-center gap-2">
                  {slide.ctaSecondary.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => advance(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => advance(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2.5 bg-gold-500' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-1 text-white/60 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </div>
  )
}
