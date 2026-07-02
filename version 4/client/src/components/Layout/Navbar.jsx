import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/vegetables', label: 'Vegetables' },
  { to: '/livestock', label: 'Livestock' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { scrollDir, scrollY } = useScrollDirection()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const navigate = useNavigate()

  const isScrolled = scrollY > 20
  const hidden = scrollDir === 'down' && scrollY > 80

  const handleLogout = () => {
    logout()
    setUserMenu(false)
    navigate('/')
  }

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="Goddard Projects"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow"
            />
            <div className="hidden sm:block">
              <p className={`font-bold text-base leading-tight ${isScrolled ? 'text-forest' : 'text-white drop-shadow'}`}>
                Goddard Projects
              </p>
              <p className={`text-xs ${isScrolled ? 'text-gold-500' : 'text-gold-300'}`}>
                Farming Made Better
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-forest text-white'
                      : isScrolled
                      ? 'text-green-900 hover:bg-green-50 hover:text-forest'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled ? 'text-forest hover:bg-green-50' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span>{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <Link to="/account" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-cream transition-colors">
                        <User size={15} /> My Account
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-forest font-semibold hover:bg-cream transition-colors">
                          <LayoutDashboard size={15} /> Admin Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={15} /> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-forest' : 'text-white'} hover:text-gold-500`}>
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-forest' : 'text-white'}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-forest text-white' : 'text-gray-700 hover:bg-cream'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-cream rounded-lg">
                      <User size={15} /> My Account
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-forest font-semibold hover:bg-cream rounded-lg">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setOpen(false) }} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <LogOut size={15} /> Log out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center btn-outline text-sm py-2">Log in</Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center btn-primary text-sm py-2">Sign up</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
