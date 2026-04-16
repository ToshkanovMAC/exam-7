import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavPath from '../Layout/NavPath'
import useCartStore from '../State/cartState'

const DELIVERY_METHODS = [
  { id: 'free', label: 'Free Shipping', price: 0 },
  { id: 'flat', label: 'Flat Rate', price: 5 },
]

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash On Delivery' },
  { id: 'upi', label: 'UPI' },
  { id: 'bank', label: 'Bank Transfer' },
]

export default function OrderView() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const navigate = useNavigate()

  const [delivery, setDelivery] = useState('free')
  const [payment, setPayment] = useState('cod')
  const [guestMode, setGuestMode] = useState(true)
  const [comments, setComments] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', city: '',
    postCode: '', country: '', region: '', email: '', password: '',
  })

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryCost = DELIVERY_METHODS.find((d) => d.id === delivery)?.price ?? 0
  const total = subtotal + deliveryCost

  function setField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  function handleOrder() {
    clearCart()
    navigate('/')
  }

  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Checkout</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:w-72 flex-shrink-0 space-y-5">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex justify-between">
                  <span>Sub-Total</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#E44B26]">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg bg-gray-50 object-contain flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#E44B26] font-semibold">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Delivery Method</h3>
              <p className="text-xs text-gray-400 mb-3">Please select the preferred shipping method.</p>
              <div className="space-y-2">
                {DELIVERY_METHODS.map((d) => (
                  <label key={d.id} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="delivery"
                      value={d.id}
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                      className="accent-[#E44B26]"/>
                    <span className="text-gray-700">{d.label}</span>
                    <span className="ml-auto text-gray-500 text-xs">Rate - ${d.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Add Comments About Your Order</p>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs
                             focus:outline-none focus:border-[#E44B26] resize-none"/>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Payment Method</h3>
              <div className="space-y-2 mb-3">
                {PAYMENT_METHODS.map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="payment"
                      value={p.id}
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                      className="accent-[#E44B26]"/>
                    <span className="text-gray-700">{p.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap mt-2">
                {['VISA', 'MC', 'PayPal', 'Skrill', 'MU'].map((card) => (
                  <span
                    key={card}
                    className="border border-gray-200 rounded px-2 py-0.5 text-[10px] text-gray-500 font-medium">
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-1">New Customer</h3>
              <p className="text-xs text-gray-400 mb-3">Checkout Options</p>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="mode" checked={guestMode} onChange={() => setGuestMode(true)} className="accent-[#E44B26]" />
                  Register Account
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="mode" checked={!guestMode} onChange={() => setGuestMode(false)} className="accent-[#E44B26]" />
                  Guest Account
                </label>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                By creating an account you will be able to shop faster and keep track of orders.
              </p>
              <button className="bg-[#E44B26] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#c93f1e] transition-colors">
                Continue
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Returning Customer</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] transition-colors"/>
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setField('password', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] transition-colors"/>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button className="bg-[#E44B26] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#c93f1e] transition-colors">
                  Login
                </button>
                <button className="text-sm text-[#E44B26] hover:underline">Forgot Password?</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Billing Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'firstName', label: 'First Name *', type: 'text', placeholder: 'Enter your first name' },
                  { key: 'lastName', label: 'Last Name *', type: 'text', placeholder: 'Enter your last name' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setField(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                                 focus:outline-none focus:border-[#E44B26] transition-colors"/></div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Address</label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={form.address}
                    onChange={(e) => setField('address', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] transition-colors"/></div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setField('city', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] transition-colors"/>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Post Code</label>
                  <input
                    type="text"
                    placeholder="Post Code"
                    value={form.postCode}
                    onChange={(e) => setField('postCode', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] transition-colors"/>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Country *</label>
                  <select
                    value={form.country}
                    onChange={(e) => setField('country', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] bg-white transition-colors">
                    <option value="">Country</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Russia</option>
                    <option>Uzbekistan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Region / State</label>
                  <select
                    value={form.region}
                    onChange={(e) => setField('region', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                               focus:outline-none focus:border-[#E44B26] bg-white transition-colors">
                    <option value="">Region/State</option>
                    <option>Tashkent</option>
                    <option>New York</option>
                    <option>California</option>
                    <option>Texas</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleOrder}
                  disabled={items.length === 0}
                  className="bg-[#E44B26] hover:bg-[#c93f1e] disabled:opacity-50
                             text-white px-8 py-3 rounded-lg font-medium transition-colors">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
