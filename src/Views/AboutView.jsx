import { Link } from 'react-router-dom'
import NavPath from '../Layout/NavPath'
import aboutImg from '../assets/images/aboutUs-image.png'

const STATS = [
  { value: '0.1k', label: 'Vendors' },
  { value: '23k',  label: 'Customers' },
  { value: '2k',   label: 'Products' },
]

const FEATURES = [
  { icon: '📦', title: 'Product Packing',    desc: 'We carefully pack every order to ensure freshness and safe delivery.' },
  { icon: '🎧', title: '24/7 Support',       desc: 'Our support team is available around the clock to help you.' },
  { icon: '🚚', title: 'Delivery in 5 Days', desc: 'Fast and reliable delivery to your doorstep within 5 business days.' },
  { icon: '🔒', title: 'Payment Secure',     desc: 'Your payment information is always safe and fully encrypted.' },
]

export default function AboutView() {
  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">About Us</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6">About The Carrot</h2>
            <p className="text-sm text-gray-500 leading-loose mb-4">
              We are the biggest market of grocery products. Get your daily needs from our store
              and enjoy fresh, organic products delivered straight to your door.
            </p>
            <p className="text-sm text-gray-500 leading-loose mb-4">
              Our mission is to bring you the finest selection of organic vegetables, fresh fruits,
              and quality groceries at competitive prices. We believe everyone deserves access to
              healthy, nutritious food.
            </p>
            <p className="text-sm text-gray-500 leading-loose mb-8">
              Thank you for choosing us for your daily needs. We are committed to providing you
              with the best shopping experience possible.
            </p>
            <div className="grid grid-cols-3 gap-4 p-5 border border-gray-100 rounded-xl">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-[#E44B26]">{value}</p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={aboutImg} alt="About Us"
              className="w-full rounded-2xl object-cover max-h-[420px] shadow-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title}
              className="p-6 border border-gray-100 rounded-xl text-center hover:shadow-md transition-shadow bg-white">
              <div className="text-4xl mb-3">{icon}</div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">{title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to start shopping?</h3>
          <p className="text-sm text-gray-400 mb-6">
            Discover thousands of fresh products available for delivery.
          </p>
          <Link to="/shop"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white font-semibold
                       px-8 py-3 rounded-lg no-underline transition-colors inline-block">
            Go To Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
