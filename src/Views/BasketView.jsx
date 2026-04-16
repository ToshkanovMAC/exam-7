import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularProducts } from '../API/api'
import ItemCard from '../Layout/ItemCard'
import NavPath from '../Layout/NavPath'
import useCartStore from '../State/cartState'

export default function BasketView() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const { data: popular = [] } = useQuery({
    queryKey: ['products', 'popular', 4],
    queryFn: () => fetchPopularProducts(4),
  })

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Cart</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={56} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/shop"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-8 py-3 rounded-lg
                         font-medium transition-colors inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="sm:hidden space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex gap-3">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 block">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-[#E44B26] transition-colors block mb-1">
                        {item.name}
                      </Link>
                      <p className="text-[#E44B26] font-bold text-sm">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-[#E44B26] transition-colors p-1 self-start flex-shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50">−</button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50">+</button>
                    </div>
                    <span className="font-bold text-gray-800">
                      Total: <span className="text-[#E44B26]">${(item.price * item.quantity).toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-semibold">Product</th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">Price</th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">Qty</th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">Total</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <Link to={`/product/${item.id}`} className="flex items-center gap-3 group">
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image_url} alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-[#E44B26]
                                           transition-colors line-clamp-2 max-w-[200px]">
                            {item.name}
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600">${item.price}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">−</button>
                            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">+</button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-[#E44B26] transition-colors p-1" aria-label="Remove">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-gray-100 pt-2">
                <span>Total</span>
                <span className="text-[#E44B26]">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-10 gap-3">
              <Link to="/shop" className="text-[#E44B26] hover:underline text-sm font-medium flex-shrink-0">
                ← Continue Shopping
              </Link>
              <Link to="/checkout"
                className="bg-[#E44B26] hover:bg-[#c93f1e] text-white text-sm
                           font-medium px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                Check Out
              </Link>
            </div>
          </>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {popular.map((p) => (
              <ItemCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
