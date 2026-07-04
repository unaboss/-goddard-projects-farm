import { motion } from 'framer-motion'
import { Sprout, Shield, Users } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const values = [
  { icon: Sprout, title: 'Sustainable Farming', desc: 'Drip irrigation, soil health, and minimal chemical inputs are at the core of every decision we make on the farm.' },
  { icon: Shield, title: 'Quality You Can Trust', desc: 'Every product leaves our farm meeting strict quality standards. We grow what we would eat ourselves.' },
  { icon: Users, title: 'Community First', desc: 'We create local employment, support surrounding communities, and share knowledge with fellow farmers.' },
]

export default function Mission() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/planting.jpeg" alt="Planting seedlings" className="rounded-2xl object-cover h-48 w-full shadow-md" />
              <img src="/images/vegetables-field.jpeg" alt="Vegetable field" className="rounded-2xl object-cover h-48 w-full shadow-md mt-8" />
              <img src="/images/seedlings.jpeg" alt="Seedlings" className="rounded-2xl object-cover h-48 w-full shadow-md" />
              <img src="/images/orchard.jpeg" alt="Mango orchard" className="rounded-2xl object-cover h-48 w-full shadow-md mt-8" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold-500 text-white rounded-2xl p-5 shadow-xl">
              <p className="text-3xl font-bold">5+</p>
              <p className="text-xs font-medium text-gold-100">Years Growing</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="section-sub mb-3">Our Mission</p>
            <h2 className="section-heading mb-6">
              Farming With Purpose,<br /> Harvesting With Pride
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              At Goddard Projects, we believe farming is more than growing food — it's about building a legacy.
              Every seed we plant is a commitment to our customers, our team, and the land we steward.
              From seedling to harvest, every step is intentional.
            </p>

            <div className="space-y-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-11 h-11 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-forest" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest mb-1">{title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
