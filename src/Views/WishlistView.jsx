import { Link } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import NavPath from '../Layout/NavPath'
import ItemCard from '../Layout/ItemCard'
import useWishlistStore from '../State/WishlistState'
import useCartStore from '../State/cartState'

export default function WishlistView() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addItem = useCartStore((s) => s.addItem)

  function handleMoveToCart(product) {
    addItem(product)
    removeItem(product.id)
  }

  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Wishlist</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Save items you love and come back to them anytime.
            </p>
            <Link to="/shop"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white font-semibold
                         px-6 py-2.5 rounded-lg no-underline transition-colors">
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                My Wishlist
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </h2>
              <button onClick={clearWishlist}
                className="flex items-center gap-1.5 text-sm text-gray-400
                           hover:text-[#E44B26] transition-colors border-none bg-transparent cursor-pointer">
                <Trash2 size={14} />
                Clear all
              </button>
            </div>

            <div className="grid gap-5"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {items.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ItemCard product={product} />
                  <button onClick={() => handleMoveToCart(product)}
                    className="mt-2 w-full text-xs font-semibold text-[#E44B26]
                               border border-[#E44B26] rounded-lg py-1.5 bg-white
                               hover:bg-[#E44B26] hover:text-white transition-colors cursor-pointer">
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/shop"
                className="text-sm text-[#E44B26] hover:underline no-underline font-medium">
                 Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
