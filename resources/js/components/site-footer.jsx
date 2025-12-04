import { Link } from '@inertiajs/react'
import logo from '../../assets/images/A1.png'

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} className='w-[80px] bg-white aspect-square object-cover' alt="" />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Nous créons des chefs-d’œuvre architecturaux qui allient innovation, durabilité et élégance intemporelle depuis plus de deux décennies.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projets</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Coordonnées</h3>
            <ul className="space-y-2 text-gray-300">
              <li>+212 5 2247 49 91</li>
              <li>info@atelierA1.com </li>
              <li>217 angle rue fraternité  et bd zerktouni 3 ème étage 20 000 Casablanca</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Atelier A1. Tous droits réservés.  Site réalisé par{' '}
            <a
              href="https://lionsgeek.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LionsGeek
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}


