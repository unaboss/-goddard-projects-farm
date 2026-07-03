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

  const connectorPoints = useMemo(() => {
    const logoX = vpW >= 768 ? 72 : 52
    const logoY = vpW >= 768 ? 74 : 62
    const logoCx = (logoX / vpW) * 100
    const logoCy = (logoY / vpH) * 100
    const bridgeY = 14
    const mainX = 3
    const bottomY = 80
    const tickEnd = mainX + 1.5
    return {
      path: `${logoCx.toFixed(2)},${logoCy.toFixed(2)} ${logoCx.toFixed(2)},${bridgeY} ${mainX},${bridgeY} ${mainX},${bottomY}`,
      tickX2: tickEnd,
    }
  }, [vpW, vpH])

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

      {/* Logo Lockup — top-left */}
      <div className="absolute top-0 left-0 z-20 pt-6 md:pt-8 px-6 md:px-10">
        <div className="flex items-start gap-2.5">
          <img
            src="/images/symbol-logo.png"
            alt="Goddard Projects Farm"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
          <div className="w-px h-14 md:h-16 bg-gradient-to-b from-gold-400/80 to-transparent rounded-full mt-1" />
          <div className="leading-none mt-4">
            <span className="block text-white font-normal text-sm md:text-base tracking-wide font-poppins text-shadow">
              Goddard Projects
            </span>
            <span className="block text-gold-400 font-bold text-[10px] md:text-xs -mt-0.5 font-poppins text-shadow">
              Farm
            </span>
          </div>
        </div>
        {/* BACKGROUND TEXT — "Farming Made Better" watermark */}
        <p
          className="absolute top-24 md:top-28 left-[185px] md:left-[250px] font-bebas uppercase text-shadow tracking-[2px] opacity-[0.3] pointer-events-none select-none z-[1]"
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

      {/* Connector lines — continuous SVG pathway */}
      <svg
        className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continuous path: logo column → horizontal bridge → main vertical line */}
        <polyline
          points={connectorPoints.path}
          stroke="#1E4D2B"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tick marks branching from vertical line toward left blocks */}
        {[21.5, 40.5, 59.5, 78.5].map((t) => (
          <line
            key={t}
            x1="3"
            y1={t}
            x2={connectorPoints.tickX2}
            y2={t}
            stroke="#1E4D2B"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* #1 top-left block */}
      <div className="absolute top-[20%] left-[4%] z-20 max-w-[clamp(130px,26vw,200px)]">
        <span className="block w-full text-center bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 shadow-sm shadow-black/30 border border-green-900">
          {blocks[3].tag}
        </span>
        <p className="text-[clamp(8px,1.8vw,10px)] leading-tight tracking-wide text-shadow">
          <strong className="text-green-50">Protected growing for better quality.</strong>{' '}
          <span className="text-green-200/80">Year-round consistency from our shade‑net system — cleaner crops, reliable supply.</span>
        </p>
      </div>

      {/* #3 — left side column */}
      <div className="absolute top-[39%] left-[4%] z-20 max-w-[clamp(130px,26vw,200px)]">
        <span className="block w-full text-center bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 shadow-sm shadow-black/30 border border-green-900">
          {blocks[2].tag}
        </span>
        <p className="text-[clamp(8px,1.8vw,10px)] leading-tight tracking-wide text-shadow">
          <strong className="text-green-50">Proudly South African —</strong>{' '}
          <span className="text-green-200/80">every hand on this farm is local. Providing jobs and skills to the Vhembe community.</span>
        </p>
      </div>

      {/* #4 HEADLINE — center, large */}
      <div className="absolute top-[49%] left-[58%] md:left-[56%] -translate-x-1/2 z-20 max-w-[360px] md:max-w-[640px] text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide text-shadow whitespace-pre-line drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] font-oswald" style={{ textWrap: 'balance' }}>
          {blocks[6].title.split('\n').map((line, j) =>
            j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h1>
        <p className="text-sm md:text-base text-green-100 mt-5 leading-relaxed text-shadow max-w-[360px] md:max-w-[560px]">
          {blocks[6].sub}
        </p>
        <div className="mt-6 space-y-2.5">
          <p className="text-sm md:text-base text-green-200/70 font-light uppercase tracking-[0.3em] text-shadow">
            Since 2007
          </p>
          <span className="inline-block bg-gold-500/90 text-green-950 text-xs md:text-sm font-bold px-4 py-1 rounded-full shadow-md shadow-black/30 backdrop-blur-sm">
            BBBEE Level 1
          </span>
        </div>
      </div>

      {/* #6 — below the people block (left of headline) */}
      <div className="absolute top-[58%] left-[4%] z-20 max-w-[clamp(130px,26vw,200px)]">
        <span className="block w-full text-center bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 shadow-sm shadow-black/30 border border-green-900">
          {blocks[5].tag}
        </span>
        <p className="text-[clamp(8px,1.8vw,10px)] leading-tight tracking-wide text-shadow">
          <strong className="text-green-50">Grown to your demand.</strong>{' '}
          <span className="text-green-200/80">We plan planting cycles around what you need — fresh produce when your business requires it.</span>
        </p>
      </div>

      {/* #5 — left side column */}
      <div className="absolute top-[77%] left-[4%] z-20 max-w-[clamp(130px,26vw,200px)]">
        <span className="block w-full text-center bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 shadow-sm shadow-black/30 border border-green-900">
          {blocks[4].tag}
        </span>
        <p className="text-[clamp(8px,1.8vw,10px)] leading-tight tracking-wide text-shadow">
          <strong className="text-green-50">BBBEE Level 1 certified.</strong>{' '}
          <span className="text-green-200/80">Our supply chain creates jobs, builds skills, and strengthens the local community.</span>
        </p>
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
