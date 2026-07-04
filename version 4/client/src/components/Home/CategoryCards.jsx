import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Beef } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const categories = [
  {
    title: 'Fresh Vegetables',
    subtitle: 'Tomatoes, Spinach, Kale & More',
    desc: 'Grown under shade netting with drip irrigation. Pesticide-conscious, nutrient-rich, and harvested to order.',
    image: '/images/tomatoes-vine.jpeg',
    to: '/vegetables',
    icon: Leaf,
    color: 'from-green-900/80',
  },
  {
    title: 'Healthy Livestock',
    subtitle: 'Cattle Raised Right',
    desc: 'Free-range cattle managed with care. We prioritise animal welfare and responsible land stewardship.',
    image: '/images/livestock-cattle.jpeg',
    to: '/livestock',
    icon: Beef,
    color: 'from-amber-900/80',
  },
]

export default function CategoryCards() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-sub mb-3">What We Offer</p>
          <h2 className="section-heading">Two Ways To Explore<br className="hidden md:block" /> Goddard Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map(({ title, subtitle, desc, image, to, icon: Icon, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to={to} className="group block relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">{subtitle}</span>
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">{desc}</p>
                  <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
