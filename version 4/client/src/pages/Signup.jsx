import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
      toast.success('Account created! Welcome to Goddard Projects.')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/images/planting.jpeg" alt="Farm" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-forest/70 flex flex-col justify-end p-12 text-white">
          <img src="/images/logo.jpeg" alt="Logo" className="w-16 h-16 rounded-full mb-6" />
          <h2 className="text-3xl font-bold mb-3">Join Our Community</h2>
          <p className="text-green-200">Create an account to track inquiries, save your favourite products, and get notified about seasonal availability.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <img src="/images/logo.jpeg" alt="Logo" className="w-14 h-14 rounded-full mx-auto mb-4 lg:hidden" />
            <h1 className="text-2xl font-bold text-forest">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Join Goddard Projects today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input required type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 8 characters" className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <input required type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
                placeholder="Repeat your password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white" />
            </div>
            <p className="text-xs text-gray-400">
              By signing up you agree to our{' '}
              <Link to="/terms" className="text-forest hover:underline">Terms of Use</Link> and{' '}
              <Link to="/privacy" className="text-forest hover:underline">Privacy Policy</Link>.
            </p>
            <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
              {loading ? 'Creating account...' : <><UserPlus size={16} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-forest font-semibold hover:text-gold-500 transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
