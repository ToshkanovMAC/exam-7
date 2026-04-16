import { Link } from 'react-router-dom'
import NavPath from '../Layout/NavPath'
import PageNav from '../Layout/PageNav'

const POST = {
  id: 1,
  title: 'Health Benefits of a Row food',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=500&fit=crop',
  author: 'Admin',
  comment_count: 7,
  created_at: 'Date - 09 .09 .2024',
  tags: ['Cabbage', 'Appetizer', 'Meat Food'],
  body: [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Unde mollis nihil sunt reprehenderit natus, salvis officiis iure enim itaque. Iste qui exercitationem optio ea maiores corporis beatae, dolores doloribus libero nesciunt qui illum.',
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed dolorous dolor odio nulla eum voluptatem lorem lorem praesent, velit nobis consetetur lorem molestiae oldie atque.',
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Placeat repellat earum architecto edit soluta qua nelo distinctio quae numquam? Quaerat nulla blanditiis postmus quae.',
  ],
  subImages: [
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=280&fit=crop',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=280&fit=crop',
  ],
  bulletPoints: [
    'Lorem ipsum dolor consectetur adipiscing elit. Molestias, dolorum!',
    'Lorem ipsum dolor consectetur adipiscing elit. Molestias, dolorum!',
  ],
  quote: 'John martin',
}

const SIDEBAR_CATEGORIES = [
  { name: 'Milks & Dairies', count: 14 },
  { name: 'Sea Food', count: 16 },
  { name: 'Fresh Fruit', count: 42 },
  { name: 'Pet Food', count: 31 },
  { name: 'Meat Food', count: 45 },
]

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop',
]

export default function PostView() {
  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Blog</h1>
          <NavPath
            items={[
              { label: 'Home', to: '/' },
              { label: 'Blog', to: '/blog' },
              { label: POST.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0">
          <div className="rounded-xl overflow-hidden mb-5">
            <img src={POST.image} alt={POST.title} className="w-full h-72 object-cover" />
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="text-[#E44B26] font-medium">By {POST.author}</span>
            <span>|</span>
            <span>{POST.comment_count} Comment</span>
            <span>|</span>
            <span>{POST.created_at}</span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-4">{POST.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{POST.body[0]}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {POST.subImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-44 object-cover" />
              </div>
            ))}
          </div>

          <ul className="mb-4 space-y-2">
            {POST.bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-[#E44B26] mt-0.5 flex-shrink-0">●</span>
                {point}
              </li>
            ))}
          </ul>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{POST.body[1]}</p>

          <div className="border-l-4 border-[#E44B26] pl-4 mb-4">
            <p className="text-[#E44B26] font-semibold italic">{POST.quote}</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{POST.body[2]}</p>

          <div className="flex items-center justify-between flex-wrap gap-3 border-t border-gray-100 pt-4">
            <div className="flex gap-2 flex-wrap">
              {POST.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {['f', 'x', 'in', 'ig'].map((s) => (
                <button
                  key={s}
                  className="w-7 h-7 border border-gray-200 rounded-full text-xs text-gray-400 hover:border-[#E44B26] hover:text-[#E44B26] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <PageNav currentPage={1} totalPages={3} onPageChange={() => {}} />
        </article>

        <aside className="lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search here..."
              className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26]"/>
            <button className="bg-[#E44B26] text-white px-3 rounded-r-lg hover:bg-[#c93f1e]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Category</h4>
            <ul className="space-y-2">
              {SIDEBAR_CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <button className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-[#E44B26] py-0.5 transition-colors">
                    <span>{cat.name}</span>
                    <span className="text-gray-400">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Recent Post</h4>
            <Link to="/blog/1" className="flex gap-3 group">
              <img src={GALLERY_IMGS[0]} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-1">Sept 09, 2023</p>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#E44B26] transition-colors line-clamp-2">
                  10 Tasty Organic Fruit choose
                </p>
              </div>
            </Link>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Latest Gallery</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {GALLERY_IMGS.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Vegetables', 'Juice', 'Meat Food', 'Cabbage', 'Organic Food'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-gray-200 rounded px-2 py-1
                                           text-gray-500 hover:border-[#E44B26] hover:text-[#E44B26]
                                           cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
