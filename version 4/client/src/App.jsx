import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import MobileNav from './components/Layout/MobileNav'

const Home = lazy(() => import('./pages/Home'))
const Vegetables = lazy(() => import('./pages/Vegetables'))
const Livestock = lazy(() => import('./pages/Livestock'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Account = lazy(() => import('./pages/Account'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'))

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <img src="/images/logo.jpeg" alt="Goddard Projects" className="w-16 h-16 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  )
}

const isAdminRoute = (path) => path.startsWith('/admin')
const isAuthRoute = (path) => ['/login', '/signup'].includes(path)
const isAccountRoute = (path) => path === '/account'

export default function App() {
  const location = useLocation()
  const admin = isAdminRoute(location.pathname)
  const auth = isAuthRoute(location.pathname)
  const account = isAccountRoute(location.pathname)

  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Inter, sans-serif', fontSize: '14px', borderRadius: '12px' },
          success: { iconTheme: { primary: '#1E4D2B', secondary: '#fff' } },
        }}
      />

      {!admin && !auth && !account && <Navbar />}

      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/vegetables" element={<PageWrapper><Vegetables /></PageWrapper>} />
            <Route path="/livestock" element={<PageWrapper><Livestock /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<PageWrapper><Account /></PageWrapper>} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="products" element={<AdminProducts />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>

      {!admin && !auth && !account && (
        <>
          <div className="pb-16 lg:pb-0">
            <Footer />
          </div>
          <MobileNav />
        </>
      )}
    </AuthProvider>
  )
}
