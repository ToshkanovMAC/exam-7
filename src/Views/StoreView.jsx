import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, Grid2x2, List, ShoppingCart, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../API/api'
import ItemCard from '../Layout/ItemCard'
import PageNav from '../Layout/PageNav'
import NavPath from '../Layout/NavPath'
import useCartStore from '../State/cartState'

const SORT_OPTIONS = [
  { value: 'id.asc', label: 'Featured' },
  { value: 'price.asc', label: 'Price: Low to High' },
  { value: 'price.desc', label: 'Price: High to Low' },
  { value: 'rating.desc', label: 'Top Rated' },
  { value: 'created_at.desc', label: 'Newest' },
]

const PAGE_SIZE = 9

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 animate-pulse">
      <div className="h-44 bg-gray-100 m-3 rounded-xl" />
      <div className="px-3 pb-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
        <div className="h-3 bg-gray-100 rounded w-1/4 mx-auto" />
      </div>
    </div>
  )
}

function ProductListCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const { id, name, price, old_price, image_url, rating, review_count, categories, brand, description } = product

  return (
    <Link
      to={`/product/${id}`}
      className="flex gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow group bg-white">
      <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 mb-1">{categories?.name}</p>
        <p className="font-semibold text-gray-800 group-hover:text-[#E44B26] transition-colors line-clamp-1">
          {name}
        </p>
        <div className="flex items-center gap-0.5 my-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`text-sm ${rating >= s ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
          ))}
          <span className="text-xs text-gray-400 ml-1">({review_count})</span>
        </div>
        {brand && <p className="text-xs text-gray-400 mb-1">By {brand}</p>}
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
        )}
        <div className="flex items-center gap-3 mt-auto">
          <span className="text-[#E44B26] font-bold text-base">${price}</span>
          {old_price && (
            <span className="text-gray-400 text-sm line-through">${old_price}</span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addItem(product)
            }}
            className="ml-auto flex items-center gap-1.5 bg-[#E44B26] hover:bg-[#c93f1e] text-white text-xs px-4 py-2 rounded transition-colors">
            <ShoppingCart size={13} /> Add to Cart</button>
        </div>
      </div>
    </Link>
  )
}

export default function StoreView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [gridView, setGridView] = useState(true)
  const [maxPrice, setMaxPrice] = useState(500)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const page = parseInt(searchParams.get('page') || '1')
  const sort = searchParams.get('sort') || 'id.asc'
  const categoryId = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
      if (key === 'category') next.delete('search')
    } else {
      next.delete(key)
    }
    next.delete('page')
    setSearchParams(next)
  }

  function setPage(p) {
    const next = new URLSearchParams(searchParams)
    next.set('page', p)
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'shop', page, sort, categoryId, search, maxPrice],
    queryFn: () =>
      fetchProducts({
        categoryId: categoryId ? Number(categoryId) : undefined,
        order: sort,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        textSearch: search ? { column: 'name', query: search } : undefined,
        rangeLte: maxPrice < 500 ? { column: 'price', value: maxPrice } : undefined,
      }),
    keepPreviousData: true,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const products = data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Shop</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 lg:py-8">
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex gap-7">
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
            w-72 lg:w-60 flex-shrink-0
            bg-gray-50 lg:bg-transparent
            overflow-y-auto lg:overflow-visible
            pt-14 lg:pt-0
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <button
              className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setSidebarOpen(false)}>
              <X size={22} />
            </button>
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Product Category</h3>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => setParam('category', '')}
                    className={`flex items-center gap-2 text-sm w-full text-left py-0.5
                    ${!categoryId ? 'text-[#E44B26] font-semibold' : 'text-gray-600 hover:text-[#E44B26]'}`}>
                    <span
                      className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0
                    ${!categoryId ? 'bg-[#E44B26] border-[#E44B26]' : 'border-gray-300'}`} />All</button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setParam('category', cat.id)}
                      className={`flex items-center gap-2 text-sm w-full text-left py-0.5
                      ${String(categoryId) === String(cat.id)
                          ? 'text-[#E44B26] font-semibold'
                          : 'text-gray-600 hover:text-[#E44B26]'
                        }`}>
                      <span
                        className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0
                      ${String(categoryId) === String(cat.id)
                            ? 'bg-[#E44B26] border-[#E44B26]'
                            : 'border-gray-300'
                          }`} />
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Filter By Price</h3>
              <input
                type="range"
                min={0}
                max={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E44B26]" />
              <p className="text-sm text-gray-600 mt-1 mb-2">
                Price: <span className="font-semibold text-gray-900">$0 – ${maxPrice}</span>
              </p>
              <button
                onClick={() => setParam('page', '')}
                className="bg-[#E44B26] text-white text-xs px-4 py-1.5 rounded
                         hover:bg-[#c93f1e] transition-colors">
                Filter
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Products Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Vegetables', 'Juice', 'Food', 'Dry Fruits', 'Organic', 'Fresh'].map((tag) => {
                  const matchedCat = categories.find(
                    (c) => c.name.toLowerCase().includes(tag.toLowerCase()) ||
                      tag.toLowerCase().includes(c.name.toLowerCase())
                  )
                  const isActive = matchedCat && String(categoryId) === String(matchedCat.id)
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        if (matchedCat) {
                          setParam('category', isActive ? '' : matchedCat.id)
                        } else {
                          setParam('search', search === tag ? '' : tag)
                        }
                      }}
                      className={`text-xs border rounded px-2 py-1 cursor-pointer transition-colors ${isActive || search === tag
                          ? 'border-[#E44B26] bg-[#E44B26] text-white font-semibold'
                          : 'border-gray-200 text-gray-500 hover:border-[#E44B26] hover:text-[#E44B26]'
                        }`}>
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between mb-5 shadow-sm flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="lg:hidden flex items-center gap-1 text-sm text-gray-600">
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <button
                  onClick={() => setGridView(true)}
                  className={`p-1.5 rounded ${gridView ? 'text-[#E44B26]' : 'text-gray-300 hover:text-gray-500'}`}>
                  <Grid2x2 size={17} />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-1.5 rounded ${!gridView ? 'text-[#E44B26]' : 'text-gray-300 hover:text-gray-500'}`}>
                  <List size={17} />
                </button>
                <p className="text-sm text-gray-500">
                  {!isLoading && `We found ${total} items for you!`}
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                Sort By:
                <select
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1 text-sm text-gray-700
                           focus:outline-none focus:border-[#E44B26]">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {gridView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {isLoading
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
                  : products.map((p) => <ItemCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {isLoading
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
                  : products.map((p) => <ProductListCard key={p.id} product={p} />)}
              </div>
            )}

            {!isLoading && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">No products found.</p>
                <button
                  onClick={() => setSearchParams({})}
                  className="text-[#E44B26] hover:underline text-sm">
                  Clear filters
                </button>
              </div>
            )}

            <PageNav currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
