import { Tractor, Leaf, MapPin, Phone, Mail, Calendar } from 'lucide-react'

const stats = [
  { icon: Calendar, number: '2007', label: 'Year Established' },
  { icon: Tractor, number: '32', label: 'Head of Cattle' },
  { icon: Tractor, number: '42', label: 'Head of Sheep' },
  { icon: Leaf, number: '3', label: 'Crop Varieties' },
]

export default function About() {
  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="relative py-20 md:py-28 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-8 border-gold-500" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Our Farm</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Over 19 years of supplying fresh produce and livestock from the Thohoyandou region of Limpopo.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-cream rounded-2xl">
                <stat.icon className="w-8 h-8 text-forest mx-auto mb-3" />
                <div className="text-3xl font-bold text-forest mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/gallery/farm-02.jpeg"
                alt="Goddard Projects Farm"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="section-title">Our Story</h2>
              <blockquote className="text-xl italic text-forest/80 border-l-4 border-gold-500 pl-4 my-6">
                &ldquo;We believe there is no life without food. Healthy, clean food is the foundation of a healthy community.&rdquo;
              </blockquote>
              <p className="text-gray-600 leading-relaxed mb-4">
                The farm operates on land allocated by Chief Ravele of Dzwerani/Manamane. Since 2007,
                Goddard Projects Farm has been dedicated to producing quality livestock and fresh vegetables
                for wholesalers and grocery stores across the region.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What began as a small family operation has grown into a trusted B2B supplier. Every head of
                cattle, every sheep, and every crop is raised with the same commitment to quality that has
                defined the farm from day one.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a BBBEE Level 1 enterprise, we are proud to contribute to South Africa&apos;s agricultural
                economy while providing maximum procurement recognition for our partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Location</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are located in the Thohoyandou region of Limpopo, strategically positioned to serve
                wholesalers and grocery stores throughout the province and beyond.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Plot Manamane, Manamane Village</p>
                    <p className="text-gray-600">Thohoyandou, Limpopo, 0950</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-forest flex-shrink-0" />
                  <a href="tel:+27820406558" className="text-gray-700 hover:text-forest">082 040 6558</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-forest flex-shrink-0" />
                  <a href="mailto:info@rendeals4.co.za" className="text-gray-700 hover:text-forest">info@rendeals4.co.za</a>
                </div>
              </div>
            </div>
            <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7372.261827546748!2d30.449217!3d-23.032375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzU2LjYiUyAzMMKwMjcnMDYuNSJF!5e0!3m2!1sen!2sza!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Goddard Projects Farm location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
