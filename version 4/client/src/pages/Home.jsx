import HeroCarousel from '../components/Home/HeroCarousel'
import CategoryCards from '../components/Home/CategoryCards'
import SeasonalAvailability from '../components/Home/SeasonalAvailability'
import Mission from '../components/Home/Mission'
import TestimonialsPreview from '../components/Home/TestimonialsPreview'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <CategoryCards />
      <SeasonalAvailability />
      <Mission />

      {/* CTA Banner */}
      <section className="py-16 bg-gold-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Source Fresh Produce?
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Whether you're a restaurant, retailer, or individual — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="bg-white text-gold-600 font-bold px-8 py-3 rounded-lg hover:bg-cream transition-colors flex items-center gap-2 shadow">
                Get in Touch <ArrowRight size={16} />
              </Link>
              <a href="tel:+27000000000" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                <Phone size={16} /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialsPreview />
    </main>
  )
}
