import { useState, useEffect, useCallback, useMemo } from 'react'
import { ArrowRight, Calendar, ChevronDown, Tractor } from 'lucide-react'

import SeasonalAvailability from '../components/Home/SeasonalAvailability'
import SeasonsVoting from '../components/Home/SeasonsVoting'

const heroImages = [
  '/images/hero/IMG_0424.jpeg',
  '/images/hero/IMG_0440.jpeg',
  '/images/hero/IMG_0447.jpeg',
  '/images/hero/IMG_0458.jpeg',
  '/images/hero/IMG_0465.jpeg',
  '/images/hero/IMG_0469.jpeg',
  '/images/hero/IMG_0480.jpeg',
]

const blocks = [
  { tag: 'Fresh From The Greenhouse', title: 'Tomatoes Grown\nWith Purpose', sub: 'Hand-selected, sun-ripened from our covered fields.' },
  { tag: 'Harvest Season', title: 'Every Tomato\nHand-Picked', sub: 'No shortcuts, no compromises. Fresh for Limpopo.' },
  { tag: 'Our Team', title: 'The People Behind\nYour Food', sub: 'Local farmers committed to sustainable agriculture.' },
  { tag: 'Inside The Greenhouse', title: 'Protected Growing\nFor Better Quality', sub: 'Year-round consistency from our shade-net system.' },
  { tag: 'Made Better Together', title: 'Rooted In\nThe Land', sub: 'Chief Ravele\u2019s land in Dzwerani since 2007.' },
  { tag: 'Harvest Season', title: 'Beyond\nJust Tomatoes', sub: '32 cattle, 42 sheep, seasonal vegetables.' },
  { tag: 'BBBEE Level 1', title: 'From Our Soil\nTo Your Table', sub: 'Empowering Vhembe through jobs and skills.' },
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [vpW, setVpW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)
  const [vpH, setVpH] = useState(typeof window !== 'undefined' ? window.innerHeight : 900)

  useEffect(() => {
    const handleResize = () => {
      setVpW(window.innerWidth)
      setVpH(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroImages.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + heroImages.length) % heroImages.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const sideBlocks = useMemo(() => {
    const isSmall = vpW < 640
    return [
      { blockIdx: 3, top: isSmall ? 22 : 22, tickY: 23.5 },
      { blockIdx: 2, top: isSmall ? 47 : 40, tickY: isSmall ? 48.5 : 41.5 },
      { blockIdx: 5, top: isSmall ? 72 : 60, tickY: isSmall ? 73.5 : 61.5 },
    ]
  }, [vpW])

  const connectorPoints = useMemo(() => {
    const logoX = vpW >= 768 ? 72 : 52
    const logoY = vpW >= 768 ? 74 : 62
    const logoCx = (logoX / vpW) * 100
    const logoCy = (logoY / vpH) * 100
    const bridgeY = 14
    const mainX = 3
    const isSmall = vpW < 640
    const bottomY = isSmall ? 74 : 62
    return {
      path: `${logoCx.toFixed(2)},${logoCy.toFixed(2)} ${logoCx.toFixed(2)},${bridgeY} ${mainX},${bridgeY} ${mainX},${bottomY}`,
      ticks: sideBlocks.map(b => b.tickY),
      bridgeY,
      mainX,
      logoCx: (logoX / vpW) * 100,
    }
  }, [vpW, vpH, sideBlocks])

  return (
    <>
    <section className="relative h-screen overflow-hidden">
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${img}')`,
            opacity: idx === current ? 1 : 0,
            filter: 'contrast(1.2) saturate(1.1)',
          }}
        />
      ))}

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 70%),
            radial-gradient(ellipse at bottom left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 65%),
            linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)
          `,
        }}
      />

      {/* Left column — logo + text blocks grouped */}
      <div className="absolute inset-y-0 left-0 z-20 w-[clamp(170px,35vw,260px)]">
        {/* Logo Lockup — top-left */}
        <div className="pt-6 md:pt-8 px-6 md:px-10">
          <div className="flex items-start gap-2.5">
            <img
              src="/images/symbol-logo.png"
              alt="Goddard Projects Farm"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="w-px h-14 md:h-16 bg-gradient-to-b from-gold-400/80 to-transparent rounded-full mt-1" />
            <div className="leading-none mt-4">
              <span className="block text-white font-normal text-sm md:text-base tracking-wide font-bebas text-shadow">
                Goddard Projects
              </span>
              <span className="block text-gold-400 font-bold text-[10px] md:text-xs -mt-0.5 font-bebas text-shadow">
                Farm
              </span>
            </div>
          </div>
          {/* BACKGROUND TEXT — "Farming Made Better" watermark */}
          <p
            className="absolute top-24 md:top-28 left-[36vw] md:left-[34vw] font-bebas uppercase text-shadow tracking-[2px] opacity-[0.3] pointer-events-none select-none z-[1]"
            style={{
              fontWeight: 400,
              fontSize: '100px',
              lineHeight: 0.78,
              color: '#ffffff',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
            }}
          >
            Farming<br />Made<br />Better
          </p>
        </div>

        {/* #1 top-left block */}
        <div className="absolute left-0 w-full px-6 md:px-10" style={{ top: `${sideBlocks[0].top}%` }}>
          {/* L-connector: tick → junction dot → vertical line */}
          <div className="absolute left-0 top-2 pointer-events-none">
            <div className="absolute left-0 top-0 -translate-x-full w-[5vw] h-px bg-gradient-to-r from-green-700/60 to-transparent" />
            <div className="absolute left-0 top-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-700/60" />
            <div className="absolute left-0 w-px bg-green-700/60" style={{ bottom: '100%', height: '0.5rem' }} />
          </div>
          <span className="block w-full text-center bg-green-900/40 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 mb-2">
            {blocks[3].tag}
          </span>
          <p className="text-[clamp(10px,1.8vw,12px)] leading-snug tracking-wide text-shadow">
            <strong className="text-green-50">Protected growing for better quality.</strong>{' '}
            <span className="text-white/70">Year-round consistency from our shade‑net system — cleaner crops, reliable supply.</span>
          </p>
        </div>

        {/* #3 — left side column */}
        <div className="absolute left-0 w-full px-6 md:px-10" style={{ top: `${sideBlocks[1].top}%` }}>
          {/* L-connector: tick → junction dot → vertical line */}
          <div className="absolute left-0 top-2 pointer-events-none">
            <div className="absolute left-0 top-0 -translate-x-full w-[5vw] h-px bg-gradient-to-r from-green-700/60 to-transparent" />
            <div className="absolute left-0 top-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-700/60" />
            <div className="absolute left-0 w-px bg-green-700/60" style={{ bottom: '100%', height: '0.5rem' }} />
          </div>
          <span className="block w-full text-center bg-green-900/40 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 mb-2">
            {blocks[2].tag}
          </span>
          <p className="text-[clamp(10px,1.8vw,12px)] leading-snug tracking-wide text-shadow">
            <strong className="text-green-50">Proudly South African —</strong>{' '}
            <span className="text-white/70">every hand on this farm is local. Our supply chain creates jobs, builds skills, and strengthens the local community.</span>
          </p>
        </div>

        {/* #6 — left side column */}
        <div className="absolute left-0 w-full px-6 md:px-10" style={{ top: `${sideBlocks[2].top}%` }}>
          {/* L-connector: tick → junction dot → vertical line */}
          <div className="absolute left-0 top-2 pointer-events-none">
            <div className="absolute left-0 top-0 -translate-x-full w-[5vw] h-px bg-gradient-to-r from-green-700/60 to-transparent" />
            <div className="absolute left-0 top-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-700/60" />
            <div className="absolute left-0 w-px bg-green-700/60" style={{ bottom: '100%', height: '0.5rem' }} />
          </div>
          <span className="block w-full text-center bg-green-900/40 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 mb-2">
            {blocks[5].tag}
          </span>
          <p className="text-[clamp(10px,1.8vw,12px)] leading-snug tracking-wide text-shadow">
            <strong className="text-green-50">Grown to your demand.</strong>{' '}
            <span className="text-white/70">We plan planting cycles around what you need — fresh produce when your business requires it.</span>
          </p>
        </div>
      </div>

      {/* Connector lines — continuous SVG pathway */}
      <svg
        className="absolute top-0 left-0 z-[15] w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldFade" gradientUnits="userSpaceOnUse" x1="0" y1={connectorPoints.bridgeY} x2="0" y2={connectorPoints.ticks[0]}>
            <stop offset="0%" stopColor="#C9922A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9922A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldFadeH" gradientUnits="userSpaceOnUse" x1={connectorPoints.logoCx} y1="0" x2={connectorPoints.mainX} y2="0">
            <stop offset="0%" stopColor="#C9922A" stopOpacity="0" />
            <stop offset="100%" stopColor="#C9922A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <polyline
          points={connectorPoints.path}
          stroke="#1E4D2B"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1={connectorPoints.mainX}
          y1={connectorPoints.bridgeY}
          x2={connectorPoints.mainX}
          y2={connectorPoints.ticks[0]}
          stroke="url(#goldFade)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1={connectorPoints.logoCx}
          y1={connectorPoints.bridgeY}
          x2={connectorPoints.mainX}
          y2={connectorPoints.bridgeY}
          stroke="url(#goldFadeH)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        {connectorPoints.ticks.map((t) => (
          <circle
            key={t}
            cx="3"
            cy={t}
            r="1.2"
            fill="#15803d"
            stroke="#15803d"
            strokeWidth="0.2"
          />
        ))}
      </svg>

      {/* #4 HEADLINE — center, large */}
      <div className="absolute top-[42%] left-[62%] md:left-[60%] -translate-x-1/2 z-20 max-w-[360px] md:max-w-[640px] text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide text-shadow whitespace-pre-line drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] font-oswald" style={{ textWrap: 'balance' }}>
          {blocks[6].title.split('\n').map((line, j) =>
            j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h1>
        <p className="text-sm md:text-base text-green-100 mt-3 leading-relaxed text-shadow max-w-[360px] md:max-w-[560px] font-medium">
          {blocks[6].sub}
        </p>
        <div className="mt-5 space-y-1.5">
          <p className="text-sm md:text-base text-green-200/70 font-normal uppercase tracking-[0.3em] text-shadow">
            Since 2007
          </p>
          <span className="inline-block bg-gold-500/90 text-green-950 text-xs md:text-sm font-bold px-4 py-1 rounded-full shadow-md shadow-black/30 backdrop-blur-sm">
            BBBEE Level 1
          </span>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ArrowRight className="w-5 h-5 text-white rotate-180" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2.5">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-gold-500 w-8 h-3 shadow-[0_0_12px_rgba(201,146,42,0.5)]'
                : 'bg-white/40 hover:bg-white/70 w-3 h-3'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none opacity-0 animate-[fadeIn_0.3s_4s_ease-out_forwards]">
        <ChevronDown className="w-4 h-4 text-white/50" strokeWidth={1.5} />
      </div>
    </section>

    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-forest mb-8" style={{ textWrap: 'balance' }}>About the Farm</h2>
            <blockquote className="text-xl md:text-2xl italic text-forest/70 border-l-4 border-gold-500 pl-6 my-8 leading-relaxed">
              &ldquo;We believe there is no life without food. Healthy, clean food is the foundation of a healthy community.&rdquo;
            </blockquote>
            <p className="text-gray-600 leading-relaxed mb-5">
              The farm operates on land allocated by Chief Ravele of Dzwerani/Manamane.
              For over 19 years, Goddard Projects Farm has supplied fresh produce and livestock
              from the Thohoyandou region of Limpopo to wholesalers and grocery stores.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Established in 2007, the farm has grown steadily from a small family operation
              into a trusted B2B supplier. Every head of cattle, every sheep, and every crop
              is raised with the same commitment to quality that has defined the farm from day one.
            </p>

            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: Calendar, number: '2007', label: 'Established' },
                { icon: Tractor, number: '32', label: 'Head of Cattle' },
                { icon: Tractor, number: '42', label: 'Head of Sheep' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <stat.icon className="w-6 h-6 text-forest mx-auto mb-2" />
                  <div className="text-2xl font-extrabold text-forest">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero/IMG_0447.jpeg"
              alt="Goddard Projects Farm"
              className="rounded-2xl shadow-xl w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-gold-500 rounded-xl p-4 shadow-lg hidden sm:block">
              <p className="text-white text-sm font-bold">Since 2007</p>
              <p className="text-green-950 text-xs">Trusted supplier</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SeasonalAvailability />
    <SeasonsVoting />
    </>
  )
}
