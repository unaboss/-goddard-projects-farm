import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Calendar, Tractor } from 'lucide-react'

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
          }}
        />
      ))}

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div className="absolute top-0 left-0 z-20 pt-3 md:pt-5 px-6 md:px-10 flex items-center gap-2">
        <img
          src="/images/symbol-logo.png"
          alt="Goddard Projects Farm"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-contain border-3 border-gold-500"
        />
        <div className="w-1 h-10 md:h-12 bg-forest rounded-full" />
        <div className="-mt-1 md:-mt-2">
          <span
            className="text-white font-semibold text-base md:text-lg pb-0 font-poppins"
            style={{ textShadow: '-0.1px -0.1px 0 rgba(217,197,160,0.6), 0.1px -0.1px 0 rgba(217,197,160,0.6), -0.1px 0.1px 0 rgba(217,197,160,0.6), 0.1px 0.1px 0 rgba(217,197,160,0.6), 0 2px 0 rgba(217,197,160,0.4)' }}
          >
            Goddard Projects
          </span>
          <span
            className="block text-gold-400 font-semibold text-base md:text-lg -mt-2 md:-mt-3 font-poppins"
            style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}
          >
            Farm
          </span>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-12 md:-translate-y-20 right-0 w-full max-w-2xl z-20 flex flex-col items-start text-left px-6 md:px-10">
        <h1
          className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white/90 leading-tight mb-4 tracking-wide"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
        >
          From Our Soil<br />
          <span className="text-4xl md:text-7xl lg:text-8xl">To Your Table</span>
        </h1>
        <div className="w-24 h-1 bg-gold-400 mb-4 rounded-full" />
        <p
          className="text-lg md:text-3xl text-gold-400 mb-2 font-semibold tracking-wide"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Farming Made Better
        </p>
        <p
          className="text-xs md:text-base text-white mb-4 font-light uppercase tracking-[0.3em]"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Since 2007
        </p>
        <span
          className="bg-gold-500 text-green-950 text-sm font-bold px-4 py-1.5 rounded-full"
          style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)' }}
        >
          BBBEE Level 1
        </span>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ArrowRight className="w-5 h-5 text-white rotate-180" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </button>

      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-gold-500 w-8' : 'bg-white/50 hover:bg-white/80 w-3'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
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
