import { useState } from 'react'
import { X } from 'lucide-react'

const images = [
  { src: '/images/gallery/gallery-01.jpeg', alt: 'Farm landscape' },
  { src: '/images/gallery/gallery-02.jpeg', alt: 'Cattle grazing' },
  { src: '/images/gallery/gallery-03.jpeg', alt: 'Fresh tomatoes' },
  { src: '/images/gallery/gallery-04.jpeg', alt: 'Sheep herd' },
  { src: '/images/gallery/gallery-05.jpeg', alt: 'Crop fields' },
  { src: '/images/gallery/gallery-06.jpeg', alt: 'Farm workers' },
  { src: '/images/gallery/gallery-07.jpeg', alt: 'Butternut harvest' },
  { src: '/images/gallery/gallery-08.jpeg', alt: 'Farm overview' },
  { src: '/images/gallery/gallery-09.jpeg', alt: 'Cattle enclosure' },
  { src: '/images/gallery/gallery-10.jpeg', alt: 'Tomato plants' },
  { src: '/images/gallery/gallery-11.jpeg', alt: 'Farm buildings' },
  { src: '/images/gallery/gallery-12.jpeg', alt: 'Fresh produce' },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <main className="pt-16">
      <section className="relative py-24 md:py-32 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-8 border-gold-500" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ textWrap: 'balance' }}>Farm Gallery</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            A visual journey through Goddard Projects Farm in Thohoyandou, Limpopo.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + images.length) % images.length) }}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white font-bold text-xl"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <img
            src={images[selected].src}
            alt={images[selected].alt}
            className="max-h-[85vh] max-w-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % images.length) }}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white font-bold text-xl"
            aria-label="Next image"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selected + 1} / {images.length} — {images[selected].alt}
          </div>
        </div>
      )}
    </main>
  )
}
