import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpeg" alt="Goddard Projects" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-bold text-lg leading-tight">Goddard Projects</p>
                <p className="text-gold-400 text-xs">Farming Made Better</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              From our fields to your table — we grow fresh, nutritious produce and raise healthy livestock using responsible farming practices.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"><Facebook size={15} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"><Instagram size={15} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"><Twitter size={15} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gold-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-200">
              {[['/', 'Home'], ['/vegetables', 'Vegetables'], ['/livestock', 'Livestock'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-gold-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gold-400 mb-4">Our Produce</h3>
            <ul className="space-y-2 text-sm text-green-200">
              {['Tomatoes', 'Spinach', 'Kale', 'Cabbage', 'Beetroot', 'Dairy Cattle', 'Beef Cattle'].map(p => (
                <li key={p} className="hover:text-gold-400 cursor-pointer transition-colors">{p}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-gold-400 mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-green-200">
              <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-gold-400 flex-shrink-0" /><span>Goddard Farm, Northern Cape, South Africa</span></li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-gold-400 flex-shrink-0" /><a href="tel:+27000000000" className="hover:text-gold-400 transition-colors">+27 (0) 00 000 0000</a></li>
              <li className="flex items-center gap-2"><Mail size={15} className="text-gold-400 flex-shrink-0" /><a href="mailto:info@goddardprojects.co.za" className="hover:text-gold-400 transition-colors">info@goddardprojects.co.za</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300">
          <p>© {new Date().getFullYear()} Goddard Projects. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
