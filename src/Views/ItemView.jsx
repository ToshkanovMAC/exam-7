import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById, fetchPopularProducts } from '../API/api'
import ItemCard from '../Layout/ItemCard'
import NavPath from '../Layout/NavPath'
import useCartStore from '../State/cartState'

const TABS = ['Description', 'Information', 'Review']

export default function ItemView() {
  const { id } = useParams()
  const addItem = useCartStore((s) => s.addItem)

  const [activeTab, setActiveTab] = useState('Description')
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  })

  const { data: related = [] } = useQuery({
    queryKey: ['products', 'popular', 4],
    queryFn: () => fetchPopularProducts(4),
  })

  if (isLoading) return <ProductDetailSkeleton />
  if (!product)
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-lg mb-4">Product not found.</p>
        <Link to="/shop" className="text-[#E44B26] hover:underline">Back to Shop</Link>
      </div>
    )

  const {
    name, price, old_price, image_url, description, brand, weight,
    rating, review_count, is_featured, is_new, is_sale,
    diet_type, speciality, flavour, stock, categories,
  } = product

  const discountPct = old_price
    ? Math.round(((old_price - price) / old_price) * 100)
    : null

  const images = [image_url, image_url, image_url, image_url].filter(Boolean)

  function handleAdd() {
    for (let i = 0; i < quantity; i++) addItem(product)
  }

  return (
    <div>
      <div className="bg-[#E44B26] py-4 sm:py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg sm:text-xl">Product</h1>
          <NavPath
            items={[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
              { label: 'Product' },
            ]}/>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="lg:w-[340px] flex-shrink-0">
            <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center h-56 sm:h-72 mb-3">
              <img
                src={images[activeImg]}
                alt={name}
                className="w-full h-full object-contain mix-blend-multiply"/>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-gray-50
                    ${activeImg === idx ? 'border-[#E44B26]' : 'border-gray-100 hover:border-gray-300'}`}>
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply"/>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{name}</h1>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={`text-base ${rating >= s ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">({review_count} Review)</span>
            </div>

            <div className="text-sm space-y-1.5 mb-4 text-gray-600">
              {brand && (
                <p>
                  <span className="font-medium text-gray-800 w-24 inline-block">Brand</span>: {brand}
                </p>
              )}
              {flavour && (
                <p>
                  <span className="font-medium text-gray-800 w-24 inline-block">Flavour</span>: {flavour}
                </p>
              )}
              {diet_type && (
                <p>
                  <span className="font-medium text-gray-800 w-24 inline-block">Diet Type</span>: {diet_type}
                </p>
              )}
              {weight && (
                <p>
                  <span className="font-medium text-gray-800 w-24 inline-block">Weight</span>: {weight}
                </p>
              )}
              {speciality && (
                <p>
                  <span className="font-medium text-gray-800 w-24 inline-block">Speciality</span>: {speciality}
                </p>
              )}
              <p>
                <span className="font-medium text-gray-800 w-24 inline-block">Stock</span>: {stock} items
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-black text-[#E44B26]">${price}</span>
              {old_price && (
                <>
                  <span className="text-gray-400 line-through text-lg">${old_price}</span>
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded">
                    -{discountPct}%
                  </span>
                </>
              )}
            </div>

            <div className="flex gap-2 mb-5">
              {is_new && (
                <span className="bg-[#3BB77E] text-white text-xs font-bold px-2 py-0.5 rounded">New</span>
              )}
              {is_sale && (
                <span className="bg-[#4096EE] text-white text-xs font-bold px-2 py-0.5 rounded">Sale</span>
              )}
              {is_featured && (
                <span className="bg-[#E44B26] text-white text-xs font-bold px-2 py-0.5 rounded">Hot</span>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-10 flex items-center justify-center text-gray-500
                             hover:bg-gray-50 transition-colors text-lg">-</button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-10 flex items-center justify-center text-gray-500
                             hover:bg-gray-50 transition-colors text-lg">+</button>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#E44B26] hover:bg-[#c93f1e]
                           text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors flex-1 sm:flex-none justify-center">
                <ShoppingCart size={16} /> Add To Cart</button>

              <div className="flex gap-2">
                <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center
                                   justify-center text-gray-400 hover:text-[#E44B26] hover:border-[#E44B26]
                                   transition-colors">
                  <Heart size={16} />
                </button>

                <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center
                                   justify-center text-gray-400 hover:text-[#E44B26] hover:border-[#E44B26]
                                   transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex border-b border-gray-200 gap-6 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px
                  ${
                    activeTab === tab
                      ? 'border-[#E44B26] text-[#E44B26]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            {activeTab === 'Description' && (
              <p>{description || 'No description available.'}</p>
            )}
            {activeTab === 'Information' && (
              <div className="space-y-2">
                {brand && <p><strong>Brand:</strong> {brand}</p>}
                {weight && <p><strong>Weight:</strong> {weight}</p>}
                {diet_type && <p><strong>Diet Type:</strong> {diet_type}</p>}
                {speciality && <p><strong>Speciality:</strong> {speciality}</p>}
                {flavour && <p><strong>Flavour:</strong> {flavour}</p>}
              </div>
            )}
            {activeTab === 'Review' && (
              <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ItemCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 animate-pulse">
      <div className="flex gap-10">
        <div className="w-[340px] h-72 bg-gray-100 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="h-10 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}
