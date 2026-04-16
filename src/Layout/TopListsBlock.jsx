import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'
import {
  useTopSelling, useTrending, useRecentlyAdded, useTopRated,
} from '../Queries/productQueries'

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-14 h-14 bg-gray-100 rounded flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  )
}

function ProductRow({ product }) {
  if (!product) return null
  const { id, name, price, old_price, image_url, rating } = product

  return (
    <Link to={`/product/${id}`}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 group">
      <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
        <img src={image_url} alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-3
                      group-hover:text-[#E44B26] transition-colors leading-snug">
          {name}
        </p>
        <RatingStars rating={rating} />
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#E44B26] font-semibold text-sm">${price}</span>
          {old_price && (
            <span className="text-gray-400 text-xs line-through">${old_price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

function Column({ label, products = [], isLoading }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-3 text-base pb-2 border-b border-gray-100">
        {label}
      </h3>
      <div>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)
          : products.map((p) => <ProductRow key={p.id} product={p} />)}
      </div>
    </div>
  )
}

export default function TopListsBlock() {
  const { data: rawTopSelling,    isLoading: l1 } = useTopSelling(3)
  const { data: rawTrending,      isLoading: l2 } = useTrending(3)
  const { data: rawRecentlyAdded, isLoading: l3 } = useRecentlyAdded(3)
  const { data: rawTopRated,      isLoading: l4 } = useTopRated(3)

  const normalize = (d) => Array.isArray(d) ? d : (d?.data ?? [])

  const columnsData = [
    { key: 'topSelling',    label: 'Top Selling',       data: normalize(rawTopSelling),    loading: l1 },
    { key: 'trending',      label: 'Trending Products', data: normalize(rawTrending),      loading: l2 },
    { key: 'recentlyAdded', label: 'Recently Added',    data: normalize(rawRecentlyAdded), loading: l3 },
    { key: 'topRated',      label: 'Top Rated',         data: normalize(rawTopRated),      loading: l4 },
  ]

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {columnsData.map((col) => (
          <Column key={col.key} label={col.label}
            products={col.data} isLoading={col.loading} />
        ))}
      </div>
    </section>
  )
}
