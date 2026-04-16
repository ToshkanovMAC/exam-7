import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import logo          from '../assets/icons/logo.svg'
import locationIcon  from '../assets/icons/footer-location-icon.svg'
import emailIcon     from '../assets/icons/footer-text-icon.svg'
import phoneIcon     from '../assets/icons/footer-phone-icon.svg'
import facebookIcon  from '../assets/icons/facebook.svg'
import xIcon         from '../assets/icons/x.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon  from '../assets/icons/linkedin-icon.svg'
import footerImg1    from '../assets/icons/footer-image1.svg'
import footerImg2    from '../assets/icons/footer-image2.svg'
import footerImg3    from '../assets/icons/footer-image3.svg'
import footerImg4    from '../assets/icons/footer-image4.svg'
import footerImg5    from '../assets/icons/footer-image5.svg'

const COMPANY_LINKS = [
  { label: 'About Us',             to: '/about' },
  { label: 'Delivery Information', to: '/faq' },
  { label: 'Privacy Policy',       to: '/faq' },
  { label: 'Terms & Conditions',   to: '/faq' },
  { label: 'Contact Us',           to: '/faq' },
  { label: 'Support Center',       to: '/faq' },
]

const CATEGORY_LINKS = [
  { label: 'Dairy & Bakery',     to: '/shop?category=dairy-bakery' },
  { label: 'Fruits & Vegetable', to: '/shop?category=fruits-vegetables' },
  { label: 'Snack & Spice',      to: '/shop?category=snack-spice' },
  { label: 'Juice & Drinks',     to: '/shop?category=juice-drinks' },
  { label: 'Chicken & Meat',     to: '/shop?category=chicken-meat' },
  { label: 'Fast Food',          to: '/shop?category=fast-food' },
]

const GALLERY_IMGS = [footerImg1, footerImg2, footerImg3, footerImg4, footerImg5]

const SOCIALS = [
  { icon: facebookIcon,  href: '#', label: 'Facebook' },
  { icon: xIcon,         href: '#', label: 'X' },
  { icon: instagramIcon, href: '#', label: 'Instagram' },
  { icon: linkedinIcon,  href: '#', label: 'LinkedIn' },
]

export default function BottomBar() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 sm:mt-16">
      <div className="max-w-[1200px] mx-auto px-4 py-8 sm:py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Foodzy" className="h-8 w-8" />
            <div className="leading-tight">
              <span className="block font-bold text-gray-900">Foodzy</span>
              <span className="block text-[10px] text-gray-400">A Treasure of Tastes</span>
            </div>
          </Link>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            FoodTrove is the biggest market of grocery products.
            Get your daily needs from our store.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-500">
              <img src={locationIcon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
              51 Green St. Huntington ohio beach ontario, NY 11746 KY 4783, USA.
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img src={emailIcon} alt="" className="w-4 h-4 flex-shrink-0" />
              example@email.com
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img src={phoneIcon} alt="" className="w-4 h-4 flex-shrink-0" />
              +91 123 4567890
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Category</h4>
          <ul className="space-y-2">
            {CATEGORY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Subscribe Our Newsletter</h4>
          <div className="flex mb-4">
            <input type="email" placeholder="Search here..."
              className="flex-1 border border-gray-200 rounded-l-md px-3 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26] transition-colors" />
            <button className="bg-gray-900 hover:bg-[#E44B26] text-white px-3 rounded-r-md transition-colors"
              aria-label="Subscribe">
              <Send size={15} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            {SOCIALS.map(({ icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="hover:opacity-70 transition-opacity">
                <img src={icon} alt={label} className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-1">
            {GALLERY_IMGS.map((img, idx) => (
              <div key={idx} className="aspect-square rounded overflow-hidden bg-gray-50">
                <img src={img} alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-4 text-center text-sm text-gray-400">
          © 2025{' '}
          <Link to="/" className="text-[#E44B26] hover:underline">Foodzy</Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  )
}
