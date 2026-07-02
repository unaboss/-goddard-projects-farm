import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import ProductCard from '../components/Products/ProductCard'
import InquiryDrawer from '../components/Products/InquiryDrawer'
import api from '../api/client'

const mockLivestock = [
  { id: 10, name: 'Beef Cattle', category: 'livestock', description: 'Hardy, free-range beef cattle raised on natural pasture with responsible husbandry practices. Available for bulk inquiry.', availability_status: 'fresh', season_tags: ['Year-round'], image: '/images/livestock-cattle.jpeg' },
  { id: 11, name: 'Dairy Cows', category: 'livestock', description: 'Healthy dairy cows managed in a low-stress environment. Good milk yield and temperament.', availability_status: 'limited', season_tags: ['Year-round'], image: '/images/livestock-cattle.jpeg' },
  { id: 12, name: 'Breeding Stock', category: 'livestock', description: 'Quality breeding animals selected for hardiness, fertility, and performance in Southern African conditions.', availability_status: 'limited', season_tags: ['Winter', 'Spring'], image: '/images/livestock-cattle.jpeg' },
]

export default function Livestock() {
  const [products, setProducts] = useState(mockLivestock)
  const [filtered, setFiltered] = useState(mockLivestock)
  const [search, setSearch] = useState('')
  const [inquiry, setInquiry] = useState(null)

  useEffect(() => {
    api.get('/products?category=livestock')
      .then(({ data }) => { if (data.products?.length) { setProducts(data.products); setFiltered(data.products) } })
      .catch(() => {})
  }, [])

  useEffect(() => {
    let r = products
    if (search) r = r.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(r)
  }, [search, products])

  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/images/livestock-cattle.jpeg" alt="Livestock" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 to-amber-900/40 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-widest mb-2">Goddard Projects</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Livestock</h1>
            <p className="text-white/75 max-w-lg">Well-managed, healthy cattle raised on our farm. Send an inquiry to discuss availability, pricing, and arrangements.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Key info banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3 text-sm text-amber-800">
          <span className="text-xl">🐄</span>
          <p>All livestock sales require direct discussion. Please use the inquiry button on any listing below and our team will contact you within 24 hours with details and pricing.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm mb-8">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search livestock..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={15} className="text-gray-400" /></button>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProductCard product={p} onInquire={setInquiry} />
            </motion.div>
          ))}
        </div>

        {/* Care section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="section-sub mb-3">How We Raise Our Cattle</p>
            <h2 className="section-heading mb-5">Animal Welfare Is Not Negotiable</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              {['Free-range grazing on natural pasture', 'Regular veterinary check-ups and vaccinations', 'Clean water access at all times', 'No unnecessary growth hormones', 'Stress-minimised handling practices'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden h-64">
            <img src="/images/livestock-cattle.jpeg" alt="Cattle care" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {inquiry && <InquiryDrawer product={inquiry} onClose={() => setInquiry(null)} />}
    </main>
  )
}
