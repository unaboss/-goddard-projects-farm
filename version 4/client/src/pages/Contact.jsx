import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle, ChevronDown } from 'lucide-react'
import api from '../api/client'
import toast from 'react-hot-toast'

const faqs = [
  { q: 'What areas do you deliver to?', a: 'We currently serve the Northern Cape and surrounding regions. Contact us to discuss your specific location and delivery requirements.' },
  { q: 'Do you sell wholesale or retail?', a: 'We sell both retail and wholesale. Wholesale pricing is available for restaurants, markets, and regular bulk buyers. Contact us for a quote.' },
  { q: 'How fresh is the produce when I receive it?', a: 'Most of our produce is harvested the same day or day before delivery. We prioritise freshness and do not store produce unnecessarily.' },
  { q: 'Can I visit the farm?', a: 'Yes! Farm visits are available by appointment. We love showing customers where their food comes from. Contact us to arrange a time.' },
  { q: 'Do you offer livestock for sale to the public?', a: 'Yes, our livestock is available for sale. Due to the nature of these sales, please contact us directly to discuss requirements and pricing.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      setSent(true)
      toast.success('Message sent!')
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden bg-forest">
        <div className="absolute inset-0 bg-gradient-to-br from-forest to-green-800" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center pt-16">
          <div className="text-white">
            <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-2">Let's Talk</p>
            <h1 className="text-4xl font-bold">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-bold text-forest text-xl mb-4">Get In Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Have a question about our products, pricing, or delivery? We'd love to hear from you. Fill in the form and we'll respond within 24 hours.</p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Phone', value: '+27 (0) 00 000 0000', href: 'tel:+27000000000' },
                { icon: Mail, label: 'Email', value: 'info@goddardprojects.co.za', href: 'mailto:info@goddardprojects.co.za' },
                { icon: MapPin, label: 'Location', value: 'Northern Cape, South Africa' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 p-4 bg-cream rounded-xl">
                  <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-forest text-sm hover:text-gold-500 transition-colors">{value}</a>
                    ) : (
                      <p className="font-semibold text-forest text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-forest rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">Business Hours</h3>
              <div className="space-y-1.5 text-sm text-green-200">
                <div className="flex justify-between"><span>Monday – Friday</span><span>7:00 – 17:00</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>7:00 – 13:00</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-red-300">Closed</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-forest text-xl mb-2">Message Received!</h3>
                  <p className="text-gray-500">We'll be in touch within 24 hours. Thank you for reaching out.</p>
                  <button onClick={() => setSent(false)} className="mt-6 btn-outline text-sm">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-bold text-forest text-xl mb-6">Send a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+27 ..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white">
                        <option value="">Select a topic</option>
                        <option>Product Inquiry</option>
                        <option>Wholesale Pricing</option>
                        <option>Livestock</option>
                        <option>Farm Visit</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you're looking for..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
                    {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="section-heading text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-forest text-sm">
                  {q}
                  <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">{a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
