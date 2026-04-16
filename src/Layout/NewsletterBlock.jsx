import { useState } from 'react'
import newsletterImg from '../assets/images/NewsLetterBanner-img.png'

export default function NewsletterBlock() {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setEmail('')
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-6">
      <div
        className="bg-[#EDF6EE] rounded-2xl px-8 py-10 flex flex-col
                     gap-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #3BB77E 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}/>

        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2">
            Stay home &amp; get your daily
            <br />
            needs from our shop
          </h2>
          <p className="text-sm text-gray-500">
            Start Your Daily Shopping with{' '}
            <span className="text-[#E44B26] font-medium">Nest Mart</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex relative z-10 w-full md:max-w-[473px]">
          <div className="flex items-center bg-white border border-gray-200 rounded-l-full px-4 gap-2 flex-1 md:w-64">
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400 flex-shrink-0">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 py-3 text-sm bg-transparent focus:outline-none text-gray-700"/>
          </div>
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-6 py-3
                       rounded-r-full text-sm font-medium transition-colors flex-shrink-0">
            Subscribe
          </button>
        </form>

        <img
          src={newsletterImg}
          alt="Delivery"
          className="hidden xl:block absolute right-10 bottom-0 h-60 pointer-events-none"
        />
      </div>
    </section>
  )
}
