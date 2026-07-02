import { NavLink } from 'react-router-dom'
import { Home, Info, Package, Image, PhoneCall } from 'lucide-react'

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/about', icon: Info, label: 'About' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/gallery', icon: Image, label: 'Gallery' },
  { to: '/contact', icon: PhoneCall, label: 'Contact' },
]

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-t border-green-100">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                isActive ? 'text-forest' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
