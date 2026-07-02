import { Tractor, Leaf, Phone, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const products = [
  {
    title: 'Cattle',
    icon: Tractor,
    price: 'R7,500 – R13,500',
    unit: 'per head',
    stock: '32 head available',
    desc: 'Quality beef cattle raised on open Limpopo grazing land. Suitable for wholesale and retail supply chains. Our cattle are healthy, well-fed, and ready for market.',
    features: ['Free-range grazing', 'Healthy herd', 'Competitive pricing', 'Bulk orders welcome'],
    img: '/images/hero/IMG_0440.jpeg',
  },
  {
    title: 'Sheep',
    icon: Tractor,
    price: 'R1,600 – R2,800',
    unit: 'per head',
    stock: '42 head available',
    desc: 'Healthy sheep bred for quality meat production. Available for direct purchase by wholesalers and retailers. Consistently raised to high standards.',
    features: ['Quality breeding', 'Meat production', 'Bulk availability', 'Regional delivery'],
    img: '/images/gallery/sheep-01.jpeg',
  },
  {
    title: 'Crops',
    icon: Leaf,
    price: 'Seasonal pricing',
    unit: 'contact for rates',
    stock: 'Check availability',
    desc: 'We grow Chillies, Butternuts, and Tomatoes. Our produce is picked fresh and delivered directly to wholesalers and grocery stores across the region.',
    features: ['Freshly picked', 'Chillies', 'Butternuts', 'Tomatoes'],
    img: '/images/gallery/crops-01.jpeg',
  },
]

export default function Products() {
  return (
    <main className="pt-16">
      <section className="relative py-20 md:py-28 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-8 border-gold-500" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Quality livestock and fresh produce from our farm in Thohoyandou, Limpopo.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom space-y-16">
          {products.map((product, idx) => (
            <div
              key={product.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className={idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-forest" />
                  </div>
                  <h2 className="text-3xl font-bold text-forest">{product.title}</h2>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gold-600">{product.price}</span>
                  <span className="text-gray-500 text-sm ml-2">{product.unit}</span>
                </div>
                <p className="text-sm text-forest/60 font-medium mb-2">{product.stock}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{product.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-forest rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary">
                  Enquire About {product.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className={idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <img
                  src={product.img}
                  alt={product.title}
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-forest">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need pricing or bulk orders?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Availability changes with the seasons. Contact us for current stock and pricing information.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-3">
              Get In Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:+27820406558" className="btn-outline text-white border-white hover:bg-white hover:text-forest px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Call 082 040 6558
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
