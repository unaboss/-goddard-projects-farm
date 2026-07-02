import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import api from '../../api/client'
import toast from 'react-hot-toast'

const empty = { name: '', category: 'vegetable', description: '', availability_status: 'fresh', season_tags: '', image: '' }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get('/products').then(({ data }) => setProducts(data.products || [])).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const payload = { ...form, season_tags: form.season_tags?.split(',').map(s => s.trim()).filter(Boolean) }
    try {
      if (form.id) {
        await api.put(`/products/${form.id}`, payload)
        toast.success('Product updated')
      } else {
        await api.post('/products', payload)
        toast.success('Product created')
      }
      setForm(null); load()
    } catch { toast.error('Failed to save product') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await api.delete(`/products/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-forest">Products</h2>
        <button onClick={() => setForm({ ...empty })} className="btn-primary text-sm py-2">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 overflow-hidden bg-gray-100">
                <img src={p.image || '/images/vegetables-field.jpeg'} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-forest text-sm">{p.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.availability_status === 'fresh' ? 'bg-green-100 text-green-700' : p.availability_status === 'limited' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {p.availability_status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3 capitalize">{p.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => setForm({ ...p, season_tags: p.season_tags?.join(', ') || '' })}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:border-forest hover:text-forest transition-colors">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setForm(null)} className="absolute inset-0 bg-black/40" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-forest">{form.id ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={() => setForm(null)}><X size={18} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white">
                      <option value="vegetable">Vegetable</option>
                      <option value="livestock">Livestock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Availability</label>
                    <select value={form.availability_status} onChange={e => setForm({ ...form, availability_status: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white">
                      <option value="fresh">Available</option>
                      <option value="limited">Limited</option>
                      <option value="out">Out of Season</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Season Tags (comma separated)</label>
                  <input value={form.season_tags} onChange={e => setForm({ ...form, season_tags: e.target.value })}
                    placeholder="e.g. Summer, Year-round"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                    placeholder="/images/..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                </div>
                <button type="submit" className="w-full btn-primary justify-center">
                  <Save size={15} /> {form.id ? 'Save Changes' : 'Create Product'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
