import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, User, LogOut, Home, Clock, Eye,
  CheckCircle, XCircle, LayoutDashboard, ChevronRight,
  Leaf, Package, Bell, Settings,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

const statusConfig = {
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500', icon: Clock },
  seen:      { label: 'Seen',      color: 'bg-amber-100 text-amber-700', bar: 'bg-amber-400', icon: Eye },
  responded: { label: 'Responded', color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', icon: CheckCircle },
  closed:    { label: 'Closed',    color: 'bg-gray-100 text-gray-500', bar: 'bg-gray-400', icon: XCircle },
}

const STATUS_ORDER = ['submitted', 'seen', 'responded', 'closed']

function Sidebar({ active, setActive, user, onLogout, isAdmin }) {
  const navItems = [
    { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { key: 'inquiries', icon: MessageCircle, label: 'My Inquiries' },
    { key: 'profile',   icon: User,           label: 'Profile' },
  ]

  return (
    <aside className="w-64 min-h-screen bg-[#1E4D2B] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo.jpeg" alt="Goddard Projects" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Goddard Projects</p>
            <p className="text-green-300 text-xs">Farming Made Better</p>
          </div>
        </Link>
      </div>

      {/* User badge */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-base">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
            <p className="text-green-300 text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active === key
                ? 'bg-white text-[#1E4D2B]'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}

        {isAdmin && (
          <Link
            to="/admin"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-amber-300 hover:bg-white/10 transition-all"
          >
            <Settings size={17} />
            Admin Panel
          </Link>
        )}
      </nav>

      {/* Footer actions */}
      <div className="px-3 pb-6 space-y-1">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <Home size={17} />
          Back to Site
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={17} />
          Log Out
        </button>
      </div>
    </aside>
  )
}

function Overview({ user, inquiries, setActive }) {
  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = inquiries.filter(i => i.status === s).length
    return acc
  }, {})

  const stats = [
    { label: 'Total Inquiries', value: inquiries.length, icon: MessageCircle, color: 'bg-blue-50 text-blue-600' },
    { label: 'Awaiting Reply',  value: counts.submitted + counts.seen, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'Responded',       value: counts.responded, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Closed',          value: counts.closed, icon: XCircle, color: 'bg-gray-50 text-gray-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">Here's a summary of your activity with Goddard Projects.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={19} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Recent Inquiries</h2>
          <button onClick={() => setActive('inquiries')} className="text-[#1E4D2B] text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight size={14} />
          </button>
        </div>
        {inquiries.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <Leaf size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No inquiries yet.</p>
            <Link to="/vegetables" className="text-[#1E4D2B] text-sm font-semibold mt-2 inline-block hover:underline">Browse Products →</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {inquiries.slice(0, 3).map(inq => {
              const { label, color } = statusConfig[inq.status] || statusConfig.submitted
              return (
                <div key={inq.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{inq.product_name || 'General Inquiry'}</p>
                    <p className="text-xs text-gray-400">{new Date(inq.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{label}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { to: '/vegetables', label: 'Browse Vegetables', icon: Leaf, bg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
          { to: '/livestock',  label: 'Browse Livestock',  icon: Package, bg: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
        ].map(({ to, label, icon: Icon, bg }) => (
          <Link key={to} to={to} className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-medium text-sm transition-colors ${bg}`}>
            <Icon size={18} /> {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

function Inquiries({ inquiries }) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Inquiries</h1>
        <p className="text-gray-400 text-sm mt-1">{inquiries.length} total inquiry{inquiries.length !== 1 ? 's' : ''}</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-14 shadow-sm border border-gray-100 text-center">
          <MessageCircle size={38} className="text-gray-200 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-500 mb-1">No inquiries yet</h3>
          <p className="text-gray-400 text-sm mb-5">Browse our products and send an inquiry to get started.</p>
          <Link to="/vegetables" className="inline-flex items-center gap-2 bg-[#1E4D2B] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#163d22] transition-colors">
            <Leaf size={15} /> Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq, i) => {
            const { label, color, bar, icon: StatusIcon } = statusConfig[inq.status] || statusConfig.submitted
            const currentStep = STATUS_ORDER.indexOf(inq.status)
            return (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className={`h-1 ${bar}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{inq.product_name || 'General Inquiry'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(inq.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${color}`}>
                      <StatusIcon size={11} /> {label}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm bg-gray-50 rounded-xl p-3 leading-relaxed">{inq.message}</p>

                  {inq.response && (
                    <div className="mt-3 border-l-3 border-[#1E4D2B] pl-3 border-l-2">
                      <p className="text-xs text-gray-400 mb-1 font-medium">Farm Response</p>
                      <p className="text-sm text-gray-700">{inq.response}</p>
                    </div>
                  )}

                  {/* Progress track */}
                  <div className="flex items-center gap-0 mt-4">
                    {STATUS_ORDER.map((s, idx) => {
                      const done = idx <= currentStep
                      const isLast = idx === STATUS_ORDER.length - 1
                      return (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${done ? 'bg-[#1E4D2B]' : 'bg-gray-200'}`} />
                          {!isLast && <div className={`h-px flex-1 ${done && idx < currentStep ? 'bg-[#1E4D2B]' : 'bg-gray-200'}`} />}
                        </div>
                      )
                    })}
                    <span className="text-xs text-gray-400 ml-3 capitalize whitespace-nowrap">{inq.status}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Profile({ user }) {
  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Your account details.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Avatar banner */}
        <div className="bg-[#1E4D2B] px-6 py-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white/20 text-white font-bold text-2xl flex items-center justify-center ring-4 ring-white/20">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold text-lg">{user?.name}</p>
            <span className="inline-block mt-1 text-xs bg-white/20 text-green-100 px-2.5 py-0.5 rounded-full capitalize">{user?.role}</span>
          </div>
        </div>

        {/* Fields */}
        <div className="divide-y divide-gray-50">
          {[
            { label: 'Full Name', value: user?.name },
            { label: 'Email Address', value: user?.email },
            { label: 'Account Type', value: user?.role, className: 'capitalize' },
            { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' }) : 'N/A' },
          ].map(({ label, value, className }) => (
            <div key={label} className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-gray-400">{label}</span>
              <span className={`text-sm font-medium text-gray-800 ${className || ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Account() {
  const { user, loading, logout, isAdmin } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      api.get('/inquiries/mine').then(({ data }) => setInquiries(data.inquiries || [])).catch(() => {})
    }
  }, [user])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-2 border-[#1E4D2B] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/login" />

  const handleLogout = () => { logout(); navigate('/') }

  const sidebarProps = { active, setActive, user, onLogout: handleLogout, isAdmin }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex lg:hidden"
            >
              <Sidebar {...sidebarProps} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <p className="font-bold text-[#1E4D2B] text-sm">My Account</p>
          <div className="w-8 h-8 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center text-sm font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </div>

        <main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {active === 'overview'  && <Overview user={user} inquiries={inquiries} setActive={setActive} />}
              {active === 'inquiries' && <Inquiries inquiries={inquiries} />}
              {active === 'profile'   && <Profile user={user} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
