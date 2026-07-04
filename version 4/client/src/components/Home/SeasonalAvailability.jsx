import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import api from '../../api/client'
import { useInView } from '../../hooks/useInView'

const fallback = [
  { name: 'Tomatoes', status: 'fresh', note: 'Peak harvest season' },
  { name: 'Spinach', status: 'fresh', note: 'Available weekly' },
  { name: 'Kale', status: 'fresh', note: 'In full growth' },
  { name: 'Cabbage', status: 'limited', note: 'Limited stock' },
  { name: 'Beetroot', status: 'limited', note: 'Harvest soon' },
  { name: 'Beef Cattle', status: 'fresh', note: 'Inquire for availability' },
]

const icons = {
  fresh: <CheckCircle size={16} className="text-green-600" />,
  limited: <Clock size={16} className="text-gold-500" />,
  out: <XCircle size={16} className="text-red-400" />,
}

const labels = {
  fresh: 'Available',
  limited: 'Limited',
  out: 'Out of Season',
}

export default function SeasonalAvailability() {
  const [items, setItems] = useState(fallback)
  const { ref, inView } = useInView()

  useEffect(() => {
    api.get('/products?limit=6&availability=all')
      .then(({ data }) => { if (data.products?.length) setItems(data.products) })
      .catch(() => {})
  }, [])

  return (
    <section ref={ref} className="py-16 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gold-400 font-semibold uppercase tracking-widest text-xs mb-3">Live Updates</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What's Available Right Now</h2>
          <p className="text-green-200 mt-3 text-sm">Updated regularly — contact us to place an order or inquiry.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ name, status, note }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-gold-400/40 transition-colors"
            >
              <div className="flex justify-center mb-2">{icons[status]}</div>
              <p className="text-white font-semibold text-sm mb-1">{name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                status === 'fresh' ? 'bg-green-500/20 text-green-300' :
                status === 'limited' ? 'bg-gold-500/20 text-gold-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {labels[status]}
              </span>
              <p className="text-green-300 text-xs mt-2 leading-tight">{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
