import { NavLink } from 'react-router-dom'
import { Home, Leaf, Beef, Info, Phone } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/vegetables', icon: Leaf, label: 'Veg' },
  { to: '/livestock', icon: Beef, label: 'Livestock' },
  { to: '/about', icon: Info, label: 'About' },
  { to: '/contact', icon: Phone, label: 'Contact' },
]

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
      <div className="flex">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-colors ${
                isActive ? 'text-forest' : 'text-gray-400 hover:text-forest'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className={isActive ? 'text-forest' : ''} />
                <span className="mt-0.5">{label}</span>
                {isActive && <span className="absolute bottom-0 w-8 h-0.5 bg-forest rounded-t-full" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
