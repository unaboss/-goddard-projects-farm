import { useEffect, useState } from 'react'
import { Check, X, Star, Trash2 } from 'lucide-react'
import api from '../../api/client'
import toast from 'react-hot-toast'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    api.get('/testimonials').then(({ data }) => setTestimonials(data.testimonials || [])).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const toggle = async (id, approved) => {
    try { await api.patch(`/testimonials/${id}`, { approved }); toast.success(approved ? 'Approved' : 'Hidden'); load() }
    catch { toast.error('Failed to update') }
  }

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-forest mb-6">Testimonials</h2>
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm shadow-md">No testimonials yet.</div>
      ) : (
        <div className="space-y-4">
          {testimonials.map(t => (
            <div key={t.id} className={`bg-white rounded-2xl p-5 shadow-md border-l-4 ${t.approved ? 'border-green-400' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-forest text-sm">{t.name}</span>
                    <div className="flex">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} size={11} className="fill-gold-400 text-gold-400" />)}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.approved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {t.approved ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{t.message}"</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggle(t.id, !t.approved)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${t.approved ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                    {t.approved ? <X size={14} /> : <Check size={14} />}
                  </button>
                  <button onClick={() => remove(t.id)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex items-center justify-center transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
