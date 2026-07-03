import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const contactItems = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['Plot Manamane, Manamane Village', 'Thohoyandou, Limpopo, 0950'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['082 040 6558', '+27 71 446 1512'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@rendeals4.co.za'],
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Mon–Fri: 08:00–17:00', 'Sat: 08:00–13:00'],
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // Placeholder — replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success('Message sent successfully! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="pt-16">
      <section className="relative py-24 md:py-32 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-8 border-gold-500" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ textWrap: 'balance' }}>Get In Touch</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Interested in sourcing from us? Reach out and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-forest mb-8" style={{ textWrap: 'balance' }}>Contact Information</h2>
              {contactItems.map((item) => (
                <div key={item.title} className="flex gap-5 p-5 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="h-64 rounded-2xl overflow-hidden shadow-md">
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

            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-forest mb-8" style={{ textWrap: 'balance' }}>Send a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+27 000 000 000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="cattle">Cattle Enquiry</option>
                      <option value="sheep">Sheep Enquiry</option>
                      <option value="crops">Crops Enquiry</option>
                      <option value="general">General Enquiry</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="py-20 bg-green-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-forest mb-5" style={{ textWrap: 'balance' }}>Prefer WhatsApp?</h2>
          <p className="text-gray-600 mb-8">Chat with us directly on WhatsApp for quick enquiries.</p>
          <a
            href="https://wa.me/27820406558?text=Hi%2C%20I'm%20interested%20in%20sourcing%20from%20Goddard%20Projects%20Farm."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
          >
            Chat on WhatsApp
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </main>
  )
}
