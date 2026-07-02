import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import toast from 'react-hot-toast'

export default function InquiryDrawer({ product, onClose }) {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    try {
      await api.post('/inquiries', { product_id: product?.id, message })
      setSent(true)
      toast.success('Inquiry sent!')
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-forest text-lg">Send an Inquiry</h2>
              {product && <p className="text-sm text-gray-500">About: {product.name}</p>}
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!user ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-forest" />
                </div>
                <h3 className="font-bold text-forest mb-2">Sign in to Inquire</h3>
                <p className="text-gray-500 text-sm mb-6">Create an account or sign in to send inquiries and track responses.</p>
                <div className="flex gap-3 justify-center">
                  <Link to="/login" onClick={onClose} className="btn-outline text-sm py-2">Log in</Link>
                  <Link to="/signup" onClick={onClose} className="btn-primary text-sm py-2">Sign up</Link>
                </div>
              </div>
            ) : sent ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle size={28} className="text-green-600" />
                </motion.div>
                <h3 className="font-bold text-forest mb-2">Inquiry Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We've received your message and will respond within 24 hours.</p>
                <button onClick={onClose} className="btn-primary">Done</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {product && (
                  <div className="flex gap-3 p-3 bg-cream rounded-xl">
                    <img
                      src={product.image || '/images/vegetables-field.jpeg'}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-forest text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <span className={product.availability_status === 'fresh' ? 'badge-fresh' : product.availability_status === 'limited' ? 'badge-limited' : 'badge-out'}>
                        {product.availability_status === 'fresh' ? 'Available' : product.availability_status === 'limited' ? 'Limited' : 'Out of Season'}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    required
                    placeholder={`Hi, I'm interested in ${product?.name || 'your products'}. I'd like to know about pricing, quantities available, and delivery options...`}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none"
                  />
                </div>

                <div className="text-xs text-gray-400 bg-cream rounded-lg p-3">
                  📋 We aim to respond to all inquiries within 24 hours during business hours.
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
                  {loading ? <span className="animate-pulse">Sending...</span> : <><Send size={15} /> Send Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
