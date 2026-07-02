import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { label: 'Home' },
  { label: 'About' },
  {
    label: 'Products',
    children: [
      { label: 'Livestock' },
      { label: 'Produce' },
    ],
  },
  { label: 'Gallery' },
  { label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-5 right-5 z-[60] p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
          open ? 'bg-white/20 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <nav className="text-center space-y-2">
              {links.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-center gap-1 mx-auto text-3xl md:text-4xl font-semibold py-3 text-white hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          productsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {productsOpen && (
                      <div className="space-y-1 pb-2">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setOpen(false); setProductsOpen(false) }}
                            className="block text-xl md:text-2xl font-medium py-2 text-gold-400 hover:text-gold-300 transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setOpen(false) }}
                    className="block text-3xl md:text-4xl font-semibold py-3 text-white hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="pb-8 px-6 text-center">
            <img
              src="/images/logo.png"
              alt="Goddard Projects Farm"
              className="w-40 h-auto mx-auto mb-3 drop-shadow-lg"
            />
            <div className="mt-2">
              <span className="inline-block bg-gold-500 text-green-950 text-xs font-bold px-3 py-1 rounded-full">
                BBBEE Level 1
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
