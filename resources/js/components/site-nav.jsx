import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/images/A1.png'

export default function SiteNav({ active = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full bg-[#dfdfdf] md:border-b md:border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src={logo} className='w-18 h-18 object-contain' alt="Atelier A1" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/projects" className={`px-3 py-2 text-sm font-medium ${active === 'projects' ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'}`}>Projets</Link>
              <Link href="/about" className={`px-3 py-2 text-sm font-medium ${active === 'about' ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'}`}>À propos</Link>
              <Link href="/contact" className={`px-3 py-2 text-sm font-medium ${active === 'contact' ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'}`}>Contact</Link>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="mx-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Link href="/projects" className={`block px-4 py-3 text-base font-medium ${active === 'projects' ? 'bg-gray-100 text-gray-900' : 'text-gray-800 hover:bg-gray-50'}`}>Projets</Link>
              <div className="h-px bg-gray-200"></div>
              <Link href="/about" className={`block px-4 py-3 text-base font-medium ${active === 'about' ? 'bg-gray-100 text-gray-900' : 'text-gray-800 hover:bg-gray-50'}`}>À propos</Link>
              <div className="h-px bg-gray-200"></div>
              <Link href="/contact" className={`block px-4 py-3 text-base font-medium ${active === 'contact' ? 'bg-gray-100 text-gray-900' : 'text-gray-800 hover:bg-gray-50'}`}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


