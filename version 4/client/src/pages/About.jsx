import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const timeline = [
  { year: 'Seed', label: 'Preparation', desc: 'Soil testing, bed preparation, and planting quality seeds or seedlings using drip irrigation systems.' },
  { year: 'Grow', label: 'Cultivation', desc: 'Regular monitoring, pest management, irrigation adjustments, and fertilisation to ensure optimal growth.' },
  { year: 'Harvest', label: 'Picking', desc: 'Hand-harvested at peak ripeness by our experienced team. Every item is inspected before leaving the farm.' },
  { year: 'Deliver', label: 'To You', desc: 'Freshly harvested produce delivered or collected directly — no unnecessary cold storage delays.' },
]

const team = [
  { name: 'The Goddard Family', role: 'Farm Founders', image: '/images/hero-3.jpeg' },
  { name: 'Our Field Team', role: 'The Hands Behind the Harvest', image: '/images/hero-4.jpeg' },
]

function Section({ children, className = '' }) {
  const { ref, inView } = useInView()
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="/images/hero-3.jpeg" alt="Our team" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">About Goddard Projects</h1>
            <p className="text-white/80 max-w-xl">A family-driven farming enterprise built on the belief that better farming produces better food.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story */}
        <Section className="py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-sub mb-3">Who We Are</p>
            <h2 className="section-heading mb-6">Farming Made Better —<br /> That's Our Promise</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Goddard Projects was founded on a simple idea: that farming, done with intention and care, can produce extraordinary results. We grow tomatoes, vegetables, and raise cattle on our farm in the Northern Cape.</p>
              <p>Every decision we make — from the seeds we plant to the way we care for our animals — is guided by our commitment to quality, sustainability, and the people we serve.</p>
              <p>We are not a faceless corporate operation. We are a team of people who believe in the value of honest work, healthy soil, and food that you can actually taste the difference in.</p>
            </div>
          </div>
          <div className="relative h-80">
            <img src="/images/planting.jpeg" alt="Planting" className="w-full h-full object-cover rounded-2xl shadow-lg" />
            <div className="absolute -bottom-4 -left-4 bg-forest text-white rounded-xl p-4 shadow-xl">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-green-200">Hand-harvested</p>
            </div>
          </div>
        </Section>

        {/* Timeline */}
        <Section className="py-16 border-t border-gray-100">
          <p className="section-sub mb-3 text-center">From Soil to Table</p>
          <h2 className="section-heading text-center mb-12">Where Your Food Comes From</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map(({ year, label, desc }, i) => (
              <div key={year} className="relative">
                {i < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gold-200 -ml-3 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xs uppercase tracking-wide">
                    {year}
                  </div>
                  <h3 className="font-bold text-forest mb-2">{label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Team */}
        <Section className="py-16 border-t border-gray-100">
          <p className="section-sub mb-3 text-center">The People</p>
          <h2 className="section-heading text-center mb-12">The Team Behind Goddard Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map(({ name, role, image }) => (
              <div key={name} className="relative h-72 rounded-2xl overflow-hidden shadow-lg group">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-gold-300 text-xs uppercase tracking-wider font-semibold">{role}</p>
                    <h3 className="text-white font-bold text-xl">{name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-16 border-t border-gray-100 text-center">
          <h2 className="section-heading mb-4">Come Visit the Farm</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">We welcome farm visits by appointment. Come see where your food grows and meet the team that makes it happen.</p>
          <Link to="/contact" className="btn-primary">
            Book a Visit <ArrowRight size={16} />
          </Link>
        </Section>
      </div>
    </main>
  )
}
