import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27820406558?text=Hi%2C%20I'm%20interested%20in%20sourcing%20from%20Goddard%20Projects%20Farm."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1ebe56] hover:scale-110 transition-all duration-200"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  )
}
