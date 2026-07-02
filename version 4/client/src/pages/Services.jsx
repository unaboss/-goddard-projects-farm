import { motion } from 'framer-motion'
import { Truck, ShoppingBag, Users, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'

const services = [
  {
    icon: ShoppingBag,
    title: 'Fresh Produce Supply',
    desc: 'Regular supply of fresh vegetables including tomatoes, spinach, kale, and seasonal crops. Available for retail and wholesale buyers.',
    bullets: ['Weekly supply schedules available', 'Minimum order quantities apply', 'Quality guaranteed on every delivery'],
  },
  {
    icon: Truck,
    title: 'Local Delivery',
    desc: 'We offer delivery services to businesses and households within our operational area. Fresh from the farm to your door.',
    bullets: ['Same-day or next-day delivery', 'Scheduled weekly deliveries', 'Delivery charges based on distance'],
  },
  {
    icon: Users,
    title: 'Wholesale & Bulk Orders',
    desc: 'Special pricing for restaurants, markets, schools, and large-volume buyers. Build a reliable supply chain with us.',
    bullets: ['Competitive wholesale pricing', 'Consistent volumes and quality', 'Flexible ordering schedules'],
  },
  {
    icon: Calendar,
    title: 'Farm Visits',
    desc: 'We welcome visits from buyers, schools, and the general public who want to understand where their food comes from.',
    bullets: ['Visits by appointment only', 'Educational tours available', 'See our farming methods firsthand'],
  },
]

function ServiceCard({ service, i }) {
  const { ref, inView } = useInView()
  const { icon: Icon, title, desc, bullets } = service
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 2) * 0.12 }}
      className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-5">
        <Icon size={22} className="text-forest" />
      </div>
      <h3 className="font-bold text-forest text-xl mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
      <ul className="space-y-2">
        {bullets.map(b => (
          <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0" /> {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <div className="relative h-48 bg-forest flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white pt-16">
          <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h1 className="text-4xl font-bold">Our Services</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <p className="section-sub mb-3">Services Overview</p>
          <h2 className="section-heading">How We Work With You</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
            From individual buyers to large-scale operations, we offer flexible supply arrangements to suit your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} i={i} />)}
        </div>

        {/* CTA */}
        <div className="bg-forest rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto">Reach out to discuss your requirements. We'll put together an arrangement that works for you.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold">Get a Quote <ArrowRight size={15} /></Link>
            <Link to="/vegetables" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">Browse Produce</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
