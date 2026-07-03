import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Leaf, Tractor } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Goddard Projects Farm"
                className="w-10 h-10 rounded-full object-cover border-2 border-gold-500"
              />
              <span className="text-lg font-bold">Goddard Projects</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-5">
              Fresh produce & livestock from Limpopo. Supplying wholesalers and grocers since 2007.
            </p>
            <span className="inline-block bg-gold-500 text-green-950 text-xs font-bold px-3 py-1 rounded-full">
              BBBEE Level 1
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'Products' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-green-200 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Our Products</h3>
            <ul className="space-y-2">
              {[
                { icon: Tractor, label: 'Cattle — R7,500–R13,500/head' },
                { icon: Tractor, label: 'Sheep — R1,600–R2,800/head' },
                { icon: Leaf, label: 'Chillies — seasonal' },
                { icon: Leaf, label: 'Butternuts — seasonal' },
                { icon: Leaf, label: 'Tomatoes — seasonal' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-green-200 text-sm">
                  <item.icon className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Plot Manamane, Manamane Village, Thohoyandou, Limpopo, 0950</span>
              </li>
              <li>
                <a href="tel:+27820406558" className="flex items-center gap-2 text-green-200 hover:text-gold-400 text-sm transition-colors">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  082 040 6558
                </a>
              </li>
              <li>
                <a href="tel:+27714461512" className="flex items-center gap-2 text-green-200 hover:text-gold-400 text-sm transition-colors">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  +27 71 446 1512
                </a>
              </li>
              <li>
                <a href="mailto:info@rendeals4.co.za" className="flex items-center gap-2 text-green-200 hover:text-gold-400 text-sm transition-colors">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  info@rendeals4.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-300 text-sm">
            &copy; {new Date().getFullYear()} Goddard Projects Farm &nbsp;|&nbsp; BBBEE Level 1 &nbsp;|&nbsp; Thohoyandou, Limpopo
          </p>
        </div>
      </div>
    </footer>
  )
}
