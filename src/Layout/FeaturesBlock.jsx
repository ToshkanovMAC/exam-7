import features1 from '../assets/icons/features1.svg'
import features2 from '../assets/icons/features2.svg'
import features3 from '../assets/icons/features3.svg'
import features4 from '../assets/icons/features4.svg'
import features5 from '../assets/icons/features5.svg'

const FEATURES = [
  { icon: features1, title: 'Best prices & offers', subtitle: 'Orders $50 or more' },
  { icon: features2, title: 'Free delivery', subtitle: '24/7 amazing services' },
  { icon: features3, title: 'Great daily deal', subtitle: 'When you sign up' },
  { icon: features4, title: 'Wide assortment', subtitle: 'Mega Discounts' },
  { icon: features5, title: 'Easy returns', subtitle: 'Within 30 days' },
]

export default function FeaturesBlock() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 cursor-pointer hover:scale-105 rounded-lg px-3 py-2 transition-colors">
              <img src={f.icon} alt={f.title} className="flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
