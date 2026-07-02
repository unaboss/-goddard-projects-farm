import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Eye } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product, onInquire }) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(product.isFavorited || false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleLike = (e) => {
    e.preventDefault()
    if (!user) { toast.error('Sign in to save favourites'); return }
    setLiked(!liked)
  }

  const statusConfig = {
    fresh:   { label: 'Available', cls: 'badge-fresh' },
    limited: { label: 'Limited Stock', cls: 'badge-limited' },
    out:     { label: 'Out of Season', cls: 'badge-out' },
  }
  const { label, cls } = statusConfig[product.availability_status] || statusConfig.fresh

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={product.image || '/images/vegetables-field.jpeg'}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute top-3 left-3">
          <span className={cls}>{label}</span>
        </div>
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart size={15} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        {product.season_tags?.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
            {product.season_tags.slice(0, 2).map(t => (
              <span key={t} className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gold-500 font-semibold uppercase tracking-wide mb-0.5">
              {product.category === 'livestock' ? 'Livestock' : 'Vegetable'}
            </p>
            <h3 className="font-bold text-forest text-lg leading-tight">{product.name}</h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{product.description}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onInquire && onInquire(product)}
            className="flex-1 btn-primary text-sm py-2.5 justify-center"
          >
            <MessageCircle size={14} /> Inquire
          </button>
          <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-forest hover:text-forest transition-colors">
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
