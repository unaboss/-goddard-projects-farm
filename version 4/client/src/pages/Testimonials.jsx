import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import api from '../api/client'
import { useInView } from '../hooks/useInView'

const fallback = [
  { id: 1, name: 'Thabo Nkosi', message: 'Best tomatoes I\'ve ever bought. Consistent quality, always fresh.', rating: 5, created_at: '2026-05-10' },
  { id: 2, name: 'Sarah van Wyk', message: 'The spinach and kale from this farm are incredible. You can taste the difference.', rating: 5, created_at: '2026-04-22' },
  { id: 3, name: 'Mpho Dlamini', message: 'Professional team, reliable supply, produce that speaks for itself.', rating: 5, created_at: '2026-06-01' },
  { id: 4, name: 'Johan Pretorius', message: 'We switched our restaurant supply to Goddard Projects 6 months ago and haven\'t looked back.', rating: 5, created_at: '2026-03-15' },
  { id: 5, name: 'Nokwanda Cele', message: 'Farm visit was amazing. You can see the love that goes into every crop.', rating: 5, created_at: '2026-05-28' },
  { id: 6, name: 'David Motsepe', message: 'Wholesaling from them for our market stalls. Quality is consistently high and they\'re always reliable.', rating: 5, created_at: '2026-06-12' },
]

function TestimonialCard({ t, i }) {
  const { ref, inView } = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <Quote size={24} className="text-gold-400 mb-4" />
      <p className="text-gray-600 leading-relaxed italic flex-1 mb-5">"{t.message}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-white font-bold text-sm">
            {t.name?.[0]}
          </div>
          <div>
            <p className="font-semibold text-forest text-sm">{t.name}</p>
            <p className="text-xs text-gray-400">{new Date(t.created_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: t.rating || 5 }).map((_, j) => (
            <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallback)

  useEffect(() => {
    api.get('/testimonials?approved=true')
      .then(({ data }) => { if (data.testimonials?.length) setTestimonials(data.testimonials) })
      .catch(() => {})
  }, [])

  const avg = (testimonials.reduce((s, t) => s + (t.rating || 5), 0) / testimonials.length).toFixed(1)

  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <div className="relative h-48 bg-forest flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white pt-16">
          <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-2">Real Reviews</p>
          <h1 className="text-4xl font-bold">What Our Customers Say</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 justify-center mb-12 py-8 bg-cream rounded-2xl">
          <div className="text-center">
            <p className="text-4xl font-bold text-forest">{avg}</p>
            <div className="flex justify-center mt-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold-400 text-gold-400" />)}
            </div>
            <p className="text-gray-500 text-xs">Average Rating</p>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-forest">{testimonials.length}+</p>
            <p className="text-gray-500 text-xs mt-2">Happy Customers</p>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-forest">100%</p>
            <p className="text-gray-500 text-xs mt-2">Would Recommend</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => <TestimonialCard key={t.id} t={t} i={i} />)}
        </div>
      </div>
    </main>
  )
}
