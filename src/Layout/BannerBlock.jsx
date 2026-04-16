import { Link } from 'react-router-dom'
import banner1 from '../assets/images/HomeCategory1.png'
import banner2 from '../assets/images/HomeCategory2.png'
import banner3 from '../assets/images/HomeCategory3.png'

const BANNERS = [
  {
    id: 1,
    title: 'Everyday Fresh & Clean with Our Products',
    image: banner1,
    to: '/shop?category=vegetables',
    bg: '#F5F0E8',
  },
  {
    id: 2,
    title: 'Make your Breakfast Healthy and Easy',
    image: banner2,
    to: '/shop?category=dairy-bakery',
    bg: '#FFF0F0',
  },
  {
    id: 3,
    title: 'The best Organic Products Online',
    image: banner3,
    to: '/shop?category=organic',
    bg: '#EFF4FB',
  },
]

export default function BannerBlock() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="relative rounded-xl overflow-hidden flex items-center justify-between px-6 py-6 min-h-[200px] group"
            style={{ backgroundColor: banner.bg }}>
            <div className="z-10 flex-1 pr-4">
              <p className="font-semibold text-gray-800 text-sm leading-snug mb-3 max-w-[140px]">
                {banner.title}
              </p>
              <Link
                to={banner.to}
                className="inline-block bg-[#E44B26] hover:bg-[#c93f1e] text-white
                           text-xs px-4 py-2 rounded transition-colors font-medium">
                Shop Now
              </Link>
            </div>

            <div className="flex-shrink-0 w-full flex items-center justify-end absolute right-0 top-1/2 transform -translate-y-1/2">
              <img
                src={banner.image}
                alt={banner.title}
                className="max-h-full max-w-full object-contain
                           group-hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
