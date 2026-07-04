import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/Products/ProductCard'
import InquiryDrawer from '../components/Products/InquiryDrawer'
import api from '../api/client'

const FILTERS = ['All', 'Fresh', 'Limited', 'Out of Season']
const CATEGORIES = ['All Types', 'Tomatoes', 'Leafy Greens', 'Root Vegetables', 'Brassicas']

const mockProducts = [
  { id: 1, name: 'Roma Tomatoes', category: 'vegetable', description: 'Classic Roma tomatoes grown in our shade-net greenhouse. Firm, flavourful, perfect for cooking or fresh salads.', availability_status: 'fresh', season_tags: ['Year-round'], image: '/images/tomatoes-vine.jpeg' },
  { id: 2, name: 'Cherry Tomatoes', category: 'vegetable', description: 'Sweet, vibrant cherry tomatoes picked at peak ripeness. A customer favourite — always in demand.', availability_status: 'fresh', season_tags: ['Summer', 'Autumn'], image: '/images/hero-2.jpeg' },
  { id: 3, name: 'Baby Spinach', category: 'vegetable', description: 'Tender young spinach leaves, harvested fresh weekly. High in iron, perfect for salads and cooking.', availability_status: 'fresh', season_tags: ['Year-round'], image: '/images/vegetables-field.jpeg' },
  { id: 4, name: 'Kale', category: 'vegetable', description: 'Robust, nutritious kale grown in open fields. Great for juicing, stir-fries, and salads.', availability_status: 'fresh', season_tags: ['Winter', 'Spring'], image: '/images/vegetables-field.jpeg' },
  { id: 5, name: 'Cabbage', category: 'vegetable', description: 'Large, firm cabbage heads — versatile for cooking, fermenting, or raw preparations.', availability_status: 'limited', season_tags: ['Winter'], image: '/images/vegetables-worker.jpeg' },
  { id: 6, name: 'Beetroot', category: 'vegetable', description: 'Earthy, sweet beetroot rich in antioxidants. Sold with or without tops.', availability_status: 'limited', season_tags: ['Autumn', 'Winter'], image: '/images/planting.jpeg' },
]

export default function Vegetables() {
  const [products, setProducts] = useState(mockProducts)
  const [filtered, setFiltered] = useState(mockProducts)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [inquiry, setInquiry] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get('/products?category=vegetable')
      .then(({ data }) => { if (data.products?.length) { setProducts(data.products); setFiltered(data.products) } })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = products
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()))
    if (status !== 'All') {
      const map = { Fresh: 'fresh', Limited: 'limited', 'Out of Season': 'out' }
      result = result.filter(p => p.availability_status === map[status])
    }
    setFiltered(result)
  }, [search, status, products])

  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/images/vegetables-field.jpeg" alt="Vegetables" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/40 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <p className="text-gold-300 text-sm font-semibold uppercase tracking-widest mb-2">Our Produce</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Fresh Vegetables</h1>
            <p className="text-white/75 max-w-lg">Grown with care, harvested fresh. Browse our current vegetable selection and send an inquiry for pricing and availability.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vegetables..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setStatus(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${status === f ? 'bg-forest text-white' : 'bg-white text-gray-600 hover:bg-cream border border-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          {status !== 'All' && (
            <button onClick={() => setStatus('All')} className="text-xs text-forest flex items-center gap-1 hover:underline">
              Clear filter <X size={12} />
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton h-52 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-4 w-2/3 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-5/6 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">No products found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProductCard product={p} onInquire={setInquiry} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {inquiry && <InquiryDrawer product={inquiry} onClose={() => setInquiry(null)} />}
    </main>
  )
}
