import { CheckCircle, Clock } from 'lucide-react'

const items = [
  { name: 'Tomatoes', status: 'fresh', note: 'Peak harvest season' },
  { name: 'Spinach', status: 'fresh', note: 'Available weekly' },
  { name: 'Kale', status: 'fresh', note: 'In full growth' },
  { name: 'Cabbage', status: 'limited', note: 'Limited stock' },
  { name: 'Beetroot', status: 'limited', note: 'Harvest soon' },
  { name: 'Beef Cattle', status: 'fresh', note: 'Inquire for availability' },
]

const icons = {
  fresh: <CheckCircle size={16} className="text-green-500" />,
  limited: <Clock size={16} className="text-gold-400" />,
}

const labels = {
  fresh: 'Available',
  limited: 'Limited',
}

export default function SeasonalAvailability() {
  return (
    <section className="py-16 bg-forest">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-gold-400 font-semibold uppercase tracking-[0.3em] text-xs mb-3">
            Live Updates
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            What's Available Right Now
          </h2>
          <p className="text-green-300 mt-3 text-sm">
            Updated regularly — contact us to place an order or inquiry.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ name, status, note }) => (
            <div
              key={name}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-gold-400/40 transition-colors"
            >
              <div className="flex justify-center mb-2">{icons[status]}</div>
              <p className="text-white font-semibold text-sm mb-1">{name}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  status === 'fresh'
                    ? 'bg-green-700/30 text-green-300'
                    : 'bg-gold-500/20 text-gold-300'
                }`}
              >
                {labels[status]}
              </span>
              <p className="text-green-300 text-xs mt-2 leading-tight">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
