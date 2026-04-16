import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavPath from '../Layout/NavPath'
import PageNav from '../Layout/PageNav'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Health Benefits of a Row food',
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Unde mollis nihil sunt reprehenderit natus, salvis officiis iure enim itaque.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    author: 'Admin',
    comment_count: 7,
    created_at: '2024-09-08',
    category: 'Milks & Dairies',
    tags: ['Cabbage', 'Appetizer', 'Meat Food'],
  },
  {
    id: 2,
    title: '10 Tasty Organic Fruit Choose',
    excerpt: 'Discover the best organic fruits to add to your daily diet for a healthier and more energetic lifestyle.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop',
    author: 'Admin',
    comment_count: 4,
    created_at: '2024-09-05',
    category: 'Fresh Fruit',
    tags: ['Fruits', 'Organic', 'Healthy'],
  },
  {
    id: 3,
    title: 'The Best Way to Store Fresh Vegetables',
    excerpt: 'Learn the proper techniques to keep your vegetables fresh longer and maintain their nutritional value.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    author: 'Admin',
    comment_count: 2,
    created_at: '2024-08-30',
    category: 'Vegetables',
    tags: ['Vegetables', 'Tips', 'Storage'],
  },
]

const SIDEBAR_CATEGORIES = [
  { name: 'Milks & Dairies', count: 14 },
  { name: 'Sea Food', count: 16 },
  { name: 'Fresh Fruit', count: 42 },
  { name: 'Pet Food', count: 31 },
  { name: 'Meat Food', count: 45 },
]

const RECENT_POSTS = [
  {
    id: 1,
    title: '10 Tasty Organic Fruit choose',
    date: 'Sept 09, 2023',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=80&h=80&fit=crop',
  },
]

const POPULAR_TAGS = ['Vegetables', 'Juice', 'Meat Food', 'Cabbage', 'Organic Food', 'Juice']

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop',
]

const POSTS_PER_PAGE = 2

export default function BlogsView() {
  const [activeTag, setActiveTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = activeTag
    ? BLOG_POSTS.filter((p) => p.tags.includes(activeTag))
    : BLOG_POSTS

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  function handleTagClick(tag) {
    setActiveTag((prev) => (prev === tag ? '' : tag))
    setCurrentPage(1)
  }

  function handlePageChange(p) {
    setCurrentPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Blog</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 space-y-8">
          {pagedPosts.length > 0 ? (
            pagedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">Hech narsa topilmadi</p>
              <button onClick={() => setActiveTag('')} className="text-[#E44B26] hover:underline text-sm">Filterni tozalash</button>
            </div>
          )}
          <PageNav currentPage={currentPage} totalPages={totalPages || 1} onPageChange={handlePageChange} />
        </div>

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
                  <button className="flex items-center justify-between w-full text-sm
                                     text-gray-600 hover:text-[#E44B26] transition-colors py-0.5">
                    <span>{cat.name}</span>
                    <span className="text-gray-400">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3">Recent Post</h4>
            {RECENT_POSTS.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 group mb-3">
                <img src={post.image} alt={post.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#E44B26] transition-colors line-clamp-2">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
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
              {POPULAR_TAGS.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => handleTagClick(tag)}
                  className={`text-xs border rounded px-2 py-1 cursor-pointer transition-colors ${
                    activeTag === tag
                      ? 'border-[#E44B26] bg-[#E44B26] text-white font-semibold'
                      : 'border-gray-200 text-gray-500 hover:border-[#E44B26] hover:text-[#E44B26]'
                  }`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function BlogPostCard({ post }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.id}`}>
        <img src={post.image} alt={post.title} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300" />
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
          <span className="text-[#E44B26] font-medium">By {post.author}</span>
          <span>|</span>
          <span>{post.comment_count} Comment</span>
          <span>|</span>
          <span>Date - {post.created_at}</span>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#E44B26] transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {['f', 'x', 'in', 'ig'].map((s) => (
              <button
                key={s}
                className="w-7 h-7 border border-gray-200 rounded-full text-xs
                                         text-gray-400 hover:border-[#E44B26] hover:text-[#E44B26] transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
