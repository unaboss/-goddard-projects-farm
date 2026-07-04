import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import { useInView } from '../../hooks/useInView'

const fallback = [
  { id: 1, name: 'Thabo Nkosi', message: 'Best tomatoes I\'ve ever bought. Consistent quality, always fresh. Goddard Projects is our go-to supplier.', rating: 5 },
  { id: 2, name: 'Sarah van Wyk', message: 'The spinach and kale from this farm are incredible. You can taste the difference — genuinely fresh.', rating: 5 },
  { id: 3, name: 'Mpho Dlamini', message: 'Professional team, reliable delivery, and produce that speaks for itself. Highly recommended.', rating: 5 },
]

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState(fallback)
  const { ref, inView } = useInView()

  useEffect(() => {
    api.get('/testimonials?limit=3&approved=true')
      .then(({ data }) => { if (data.testimonials?.length) setTestimonials(data.testimonials) })
      .catch(() => {})
  }, [])

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-sub mb-3">What People Say</p>
          <h2 className="section-heading">Trusted By Buyers<br className="hidden md:block" /> Across The Region</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ id, name, message, rating }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Quote size={28} className="text-gold-400 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-5 italic">"{message}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-forest">{name}</p>
                    <p className="text-xs text-gray-400">Verified Customer</p>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={13} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/testimonials" className="btn-outline">
            Read All Testimonials <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
