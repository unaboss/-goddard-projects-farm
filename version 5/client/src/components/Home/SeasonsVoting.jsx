import { useState } from 'react'
import toast from 'react-hot-toast'

const crops = [
  { name: 'Cabbage', votes: 3 },
  { name: 'Sweet Potato', votes: 5 },
  { name: 'Groundnuts', votes: 2 },
]

export default function SeasonsVoting() {
  const [selected, setSelected] = useState([])
  const [email, setEmail] = useState('')

  const toggle = (crop) => {
    setSelected((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selected.length === 0) {
      toast.error('Please select at least one crop.')
      return
    }
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address.')
      return
    }
    toast.success("Thanks for voting! We've recorded your response.")
    setSelected([])
    setEmail('')
  }

  return (
    <section className="py-20 bg-[#241E18]">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#C8A951]/60" />
            <span className="text-[#C8A951] text-sm font-medium">
              Community Poll
            </span>
            <span className="w-8 h-px bg-[#C8A951]/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#C8A951]" style={{ textWrap: 'balance' }}>
            What's Growing This Season?
          </h2>
          <p className="text-[#A89880] mt-3 text-sm">
            Help us decide what to plant next! Select your favourites below.
          </p>
        </div>

        <div className="bg-[#302820] rounded-2xl p-6 md:p-8 border border-[#443B30]">
          <div className="space-y-3 mb-6">
            {crops.map((crop) => (
              <button
                key={crop.name}
                onClick={() => toggle(crop.name)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all ${
                  selected.includes(crop.name)
                    ? 'bg-[#C8A951]/20 border border-[#C8A951]/50'
                    : 'bg-[#443B30] border border-[#443B30] hover:bg-[#443B30]/80'
                }`}
              >
                <span className="text-[#F5F0E8] font-semibold text-lg">
                  {crop.name}
                </span>
                <span className="text-[#C8A951] text-sm font-medium">
                  {crop.votes} vote{crop.votes !== 1 ? 's' : ''}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-[#443B30] border border-[#443B30] rounded-xl px-4 py-3 text-[#F5F0E8] placeholder-[#A89880] focus:outline-none focus:border-[#C8A951] transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#C8A951] text-[#241E18] font-bold rounded-xl hover:bg-[#D4AF37] transition-colors"
            >
              Cast Vote
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
