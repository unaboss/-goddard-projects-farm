import { Toaster } from 'react-hot-toast'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'
import WhatsAppButton from './components/Layout/WhatsAppButton'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Nunito, sans-serif', fontSize: '14px', borderRadius: '12px' },
          success: { iconTheme: { primary: '#1E4D2B', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <Home />
      <WhatsAppButton />
    </>
  )
}
