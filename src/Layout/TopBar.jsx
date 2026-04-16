import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  ShoppingCart, Heart, User, Search,
  Phone, Menu, X, Home, ShoppingBag,
  BookOpen, HelpCircle, Info,
} from 'lucide-react'
import useCartStore from '../State/cartState'
import useWishlistStore from '../State/WishlistState'
import logo from '../assets/icons/logo.svg'

const NAV_LINKS = [
  { label: 'Home',  to: '/',      icon: <Home size={18} />,        end: true },
  { label: 'Shop',  to: '/shop',  icon: <ShoppingBag size={18} /> },
  { label: 'Blog',  to: '/blog',  icon: <BookOpen size={18} /> },
  { label: 'About', to: '/about', icon: <Info size={18} /> },
  { label: 'FAQ',   to: '/faq',   icon: <HelpCircle size={18} /> },
]

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const items           = useCartStore((s) => s.items)
  const totalItems      = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalWishlist   = useWishlistStore((s) => s.getTotalItems())

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="hidden md:block border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-center relative h-9">

            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-3 py-1 text-sm rounded transition-colors ${
                      isActive
                        ? 'text-[#E44B26] font-semibold'
                        : 'text-gray-600 hover:text-[#E44B26]'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <a href="tel:+1234567890"
              className="absolute right-4 flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26]">
              <Phone size={13} />
              +123 (456) 7890
            </a>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-3 h-14 md:h-16">

          <button
            className="md:hidden text-gray-600 hover:text-[#E44B26] transition-colors p-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <img src={logo} alt="Foodzy" className="h-8" />
          </Link>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for items..."
              className="flex-1 border border-gray-200 rounded-l-md px-4 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26] transition-colors min-w-0" />
            <button type="submit"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-md
                         transition-colors flex items-center flex-shrink-0"
              aria-label="Search">
              <Search size={16} />
            </button>
          </form>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="sm:hidden text-gray-600 hover:text-[#E44B26] transition-colors p-1">
              <Search size={20} />
            </button>

            <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
              <User size={18} />
              <span className="hidden lg:inline">Account</span>
            </button>

            <Link to="/wishlist"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
              <div className="relative">
                <Heart size={18} />
                {totalWishlist > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px]
                                   w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalWishlist > 9 ? '9+' : totalWishlist}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            <Link to="/cart"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors relative"
              onClick={() => setMobileMenuOpen(false)}>
              <div className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px]
                                   w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)} />

          <div className="md:hidden fixed top-14 left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-100
                          animate-[slideDown_0.2s_ease-out]">
            <div className="px-4 pt-4 pb-2">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for items..."
                  autoFocus
                  className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#E44B26] transition-colors" />
                <button type="submit"
                  className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-lg transition-colors flex items-center">
                  <Search size={16} />
                </button>
              </form>
            </div>

            <nav className="px-2 pb-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                             hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium">
                  <span className="text-[#E44B26]">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 px-2 py-3 flex flex-col gap-1">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                                 hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium w-full">
                <User size={18} className="text-[#E44B26]" />
                Account
              </button>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                           hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium no-underline">
                <Heart size={18} className="text-[#E44B26]" />
                Wishlist
              </Link>
              <a href="tel:+1234567890"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                           hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium">
                <Phone size={18} className="text-[#E44B26]" />
                +123 (456) 7890
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
