import { useState, useEffect, useCallback } from 'react'
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
  { tag: 'From Our Soil', title: 'Rooted In\nThe Land', sub: 'Chief Ravele\u2019s land in Dzwerani since 2007.' },
  { tag: 'Livestock & Produce', title: 'Beyond\nJust Tomatoes', sub: '32 cattle, 42 sheep, seasonal vegetables.' },
  { tag: 'BBBEE Level 1', title: 'Farming Made\nBetter Together', sub: 'Empowering Vhembe through jobs and skills.' },
]

export default function Home() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroImages.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + heroImages.length) % heroImages.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

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
      <div className="absolute top-0 left-0 z-20 pt-5 md:pt-7 px-6 md:px-10">
        <div className="flex items-start gap-2.5">
          <img
            src="/images/symbol-logo.png"
            alt="Goddard Projects Farm"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-contain shadow-md shadow-black/40"
          />
          <div className="w-px h-10 md:h-12 bg-gradient-to-b from-gold-400/80 to-transparent rounded-full mt-1" />
          <div className="leading-none mt-4">
            <span className="block text-white font-normal text-sm md:text-base tracking-wide font-poppins text-shadow">
              Goddard Projects
            </span>
            <span className="block text-gold-400 font-bold text-[10px] md:text-xs -mt-0.5 font-poppins text-shadow">
              Farm
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-white/60 mt-3 ml-[72px] md:ml-[80px] font-light uppercase tracking-[0.15em] text-shadow">
          Farming Made Better
        </p>
      </div>

      {/* Connector lines */}
      <div
        className="absolute left-[3%] z-10 w-[3px] pointer-events-none rounded-sm"
        style={{
          top: '11%',
          height: '52.5%',
          backgroundColor: '#1E4D2B',
        }}
      />
      <div
        className="absolute [--logo-c:52px] md:[--logo-c:72px] top-[11%] z-10 h-[3px] pointer-events-none rounded-sm"
        style={{
          left: 'calc(min(3%, var(--logo-c)) - 1px)',
          width: 'calc(max(3%, var(--logo-c)) - min(3%, var(--logo-c)) + 2px)',
          backgroundColor: '#1E4D2B',
        }}
      />
      <div
        className="absolute [--logo-c:52px] md:[--logo-c:72px] z-10 w-[3px] pointer-events-none rounded-sm"
        style={{
          top: '9.5%',
          height: 'calc(1.5% + 1px)',
          left: 'var(--logo-c)',
          backgroundColor: '#1E4D2B',
        }}
      />
      {[25.5, 39.5, 51.5, 63.5].map((t) => (
        <div
          key={t}
          className="absolute z-10 h-[3px] pointer-events-none rounded-sm"
          style={{
            left: 'calc(3% - 1px)',
            top: t + '%',
            width: 'calc(1.5% + 1px)',
            backgroundColor: '#1E4D2B',
          }}
        />
      ))}

      {/* #1 top-left block */}
      <div className="absolute top-[24%] left-[4%] z-20 max-w-[140px] md:max-w-[180px]">
        <span className="inline-block bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 shadow-sm shadow-black/30 border border-green-900">
          {blocks[3].tag}
        </span>
        <h2 className="text-[10px] md:text-xs font-semibold text-white leading-tight tracking-wide text-shadow whitespace-pre-line">
          {blocks[3].title.split('\n').map((line, j) =>
              j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h2>
      </div>

      {/* #3 — left side column */}
      <div className="absolute top-[38%] left-[4%] z-20 max-w-[140px] md:max-w-[200px]">
        <span className="inline-block bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 shadow-sm shadow-black/30 border border-green-900">
          {blocks[2].tag}
        </span>
        <h2 className="text-[10px] md:text-xs font-semibold text-white leading-tight tracking-wide text-shadow whitespace-pre-line">
          {blocks[2].title.split('\n').map((line, j) =>
            j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h2>
      </div>

      {/* #4 HEADLINE — center, large */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[52%] md:left-[53%] -translate-x-1/2 z-20 max-w-[360px] md:max-w-[640px] text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide text-shadow-lg whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {blocks[6].title.split('\n').map((line, j) =>
            j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h1>
        <p className="text-sm md:text-base text-white/70 mt-2 leading-relaxed text-shadow max-w-[360px] md:max-w-[560px]">
          {blocks[6].sub}
        </p>
        <div className="mt-3 space-y-1">
          <p className="text-sm md:text-base text-white/60 font-light uppercase tracking-[0.3em] text-shadow">
            Since 2007
          </p>
          <span className="inline-block bg-gold-500/90 text-green-950 text-xs md:text-sm font-bold px-4 py-1 rounded-full shadow-md shadow-black/30 backdrop-blur-sm">
            BBBEE Level 1
          </span>
        </div>
      </div>

      {/* #5 — left side column */}
      <div className="absolute top-[62%] left-[4%] z-20 max-w-[140px] md:max-w-[180px]">
        <span className="inline-block bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 shadow-sm shadow-black/30 border border-green-900">
          {blocks[4].tag}
        </span>
        <h2 className="text-[10px] md:text-xs font-semibold text-white leading-tight tracking-wide text-shadow whitespace-pre-line">
          {blocks[4].title.split('\n').map((line, j) =>
              j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h2>
      </div>

      {/* #6 — below the people block (left of headline) */}
      <div className="absolute top-[50%] left-[4%] z-20 max-w-[140px] md:max-w-[180px]">
        <span className="inline-block bg-gradient-to-r from-green-900/35 to-gold-600/30 text-green-300 text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 shadow-sm shadow-black/30 border border-green-900">
          {blocks[5].tag}
        </span>
        <h2 className="text-[10px] md:text-xs font-semibold text-white leading-tight tracking-wide text-shadow whitespace-pre-line">
          {blocks[5].title.split('\n').map((line, j) =>
            j === 0 ? line : <span key={j} className="text-gold-400/80 block">{line}</span>
          )}
        </h2>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
        <ChevronDown className="w-4 h-4 text-white/50" strokeWidth={1.5} />
      </div>
    </section>

    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-forest mb-6">About the Farm</h2>
            <blockquote className="text-xl md:text-2xl italic text-forest/70 border-l-4 border-gold-500 pl-4 my-6 leading-relaxed">
              &ldquo;We believe there is no life without food. Healthy, clean food is the foundation of a healthy community.&rdquo;
            </blockquote>
            <p className="text-gray-600 leading-relaxed mb-4">
              The farm operates on land allocated by Chief Ravele of Dzwerani/Manamane.
              For over 19 years, Goddard Projects Farm has supplied fresh produce and livestock
              from the Thohoyandou region of Limpopo to wholesalers and grocery stores.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Established in 2007, the farm has grown steadily from a small family operation
              into a trusted B2B supplier. Every head of cattle, every sheep, and every crop
              is raised with the same commitment to quality that has defined the farm from day one.
            </p>

            <div className="grid grid-cols-3 gap-4">
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
