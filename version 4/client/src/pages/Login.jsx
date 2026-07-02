import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name?.split(' ')[0]}!`)
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/images/hero-1.jpeg" alt="Farm" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-forest/70 flex flex-col justify-end p-12 text-white">
          <img src="/images/logo.jpeg" alt="Goddard Projects" className="w-16 h-16 rounded-full mb-6" />
          <h2 className="text-3xl font-bold mb-3">Farming Made Better</h2>
          <p className="text-green-200 leading-relaxed">Sign in to track your inquiries, save favourite products, and stay updated on seasonal availability.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <img src="/images/logo.jpeg" alt="Logo" className="w-14 h-14 rounded-full mx-auto mb-4 lg:hidden" />
            <h1 className="text-2xl font-bold text-forest">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email" required value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-forest hover:text-gold-500 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary justify-center">
              {loading ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-forest font-semibold hover:text-gold-500 transition-colors">Create one</Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
