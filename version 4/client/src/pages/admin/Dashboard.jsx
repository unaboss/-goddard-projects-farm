import { useEffect, useState } from 'react'
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Package, MessageSquare, Users, Star, ImageIcon, Activity, LogOut, Menu, X, BarChart3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/client'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
]

function StatCard({ label, value, icon: Icon, color = 'bg-forest' }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-forest">{value ?? '—'}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  )
}

function AdminNav({ open, setOpen }) {
  const { logout } = useAuth()
  const location = useLocation()

  return (
    <>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-forest text-white z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/images/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-sm">Goddard Projects</p>
              <p className="text-gold-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label, end }) => {
            const active = end ? location.pathname === to : location.pathname.startsWith(to)
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-white/15 text-white' : 'text-green-200 hover:bg-white/10 hover:text-white'}`}>
                <Icon size={17} /> {label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-green-200 hover:text-white hover:bg-white/10 transition-colors mb-1">
            ← Back to Site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/20 transition-colors">
            <LogOut size={17} /> Log Out
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}
    </>
  )
}

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState(null)
  const [recentInquiries, setRecentInquiries] = useState([])
  const location = useLocation()
  const isOverview = location.pathname === '/admin'

  useEffect(() => {
    if (isAdmin) {
      api.get('/admin/stats').then(({ data }) => setStats(data)).catch(() => {})
      api.get('/inquiries?limit=5').then(({ data }) => setRecentInquiries(data.inquiries || [])).catch(() => {})
    }
  }, [isAdmin])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" /></div>
  if (!user || !isAdmin) return <Navigate to="/" />

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500">
              <Menu size={22} />
            </button>
            <h1 className="font-bold text-forest text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name?.[0]}
            </div>
          </div>
        </div>

        <div className="p-6">
          {isOverview ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Products" value={stats?.products} icon={Package} color="bg-forest" />
                <StatCard label="Total Inquiries" value={stats?.inquiries} icon={MessageSquare} color="bg-gold-500" />
                <StatCard label="Registered Users" value={stats?.users} icon={Users} color="bg-blue-600" />
                <StatCard label="Testimonials" value={stats?.testimonials} icon={Star} color="bg-purple-600" />
              </div>

              {/* Quick actions */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {navItems.slice(1).map(({ to, icon: Icon, label }) => (
                  <Link key={to} to={to} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow text-sm font-medium text-forest hover:text-gold-500">
                    <Icon size={18} className="text-forest" /> {label}
                  </Link>
                ))}
              </div>

              {/* Recent inquiries */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-forest">Recent Inquiries</h2>
                  <Link to="/admin/inquiries" className="text-xs text-gold-500 hover:underline">View all</Link>
                </div>
                {recentInquiries.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No inquiries yet.</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {recentInquiries.map(inq => (
                      <div key={inq.id} className="px-5 py-4 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-forest truncate">{inq.user_name || 'Guest'}</p>
                          <p className="text-xs text-gray-400 truncate">{inq.message}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                          inq.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                          inq.status === 'responded' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{inq.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  )
}
