import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send } from 'lucide-react'
import api from '../../api/client'
import toast from 'react-hot-toast'

const statusOptions = ['submitted', 'seen', 'responded', 'closed']
const statusColor = {
  submitted: 'bg-blue-100 text-blue-700',
  seen: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [selected, setSelected] = useState(null)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    api.get('/inquiries').then(({ data }) => setInquiries(data.inquiries || [])).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleUpdate = async (id, updates) => {
    try {
      await api.patch(`/inquiries/${id}`, updates)
      toast.success('Updated')
      load()
      if (selected?.id === id) setSelected({ ...selected, ...updates })
    } catch { toast.error('Failed to update') }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-180px)]">
      {/* List */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="font-bold text-forest text-sm">Inquiries ({inquiries.length})</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-4 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No inquiries yet.</div>
          ) : (
            inquiries.map(inq => (
              <button key={inq.id} onClick={() => { setSelected(inq); setResponse(inq.response || '') }}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-cream transition-colors ${selected?.id === inq.id ? 'bg-cream' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-forest text-xs truncate">{inq.user_name || 'Unknown'}</p>
                    <p className="text-xs text-gray-400 truncate">{inq.message}</p>
                    <p className="text-xs text-gray-300 mt-0.5">{inq.product_name || 'General'}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor[inq.status]}`}>{inq.status}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare size={36} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          </div>
        ) : (
          <>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-forest">{selected.user_name}</h3>
                <p className="text-xs text-gray-400">{new Date(selected.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <select
                value={selected.status}
                onChange={e => handleUpdate(selected.id, { status: e.target.value })}
                className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-forest bg-white"
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {selected.product_name && (
                <div className="bg-cream rounded-xl p-3 text-sm">
                  <span className="text-gray-500">Product: </span>
                  <span className="font-semibold text-forest">{selected.product_name}</span>
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Customer Message</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <label className="block text-xs font-medium text-gray-600 mb-2">Your Response</label>
              <textarea rows={3} value={response} onChange={e => setResponse(e.target.value)}
                placeholder="Write your response here..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none mb-3" />
              <button onClick={() => handleUpdate(selected.id, { response, status: 'responded' })}
                className="btn-primary text-sm py-2">
                <Send size={14} /> Send Response
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
