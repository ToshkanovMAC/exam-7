import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import NavPath from '../Layout/NavPath'
import faqImage from '../assets/images/Faq-image.png'

const FAQ_ITEMS = [
  { id: 1, question: 'What Facilities Does Your Hotel Have?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ad voluptate doloribus eos sunt labore ad enim voluptatem, sequi voluptas nam doloremnque architecto labore, vero natus.' },
  { id: 2, question: 'How Do I Book A Room For My Vacation?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
  { id: 3, question: 'How We are best among others?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
  { id: 4, question: 'Is There Any Fitness Center In Your Hotel?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
  { id: 5, question: 'What Type Of Room Service Do You Offer?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
  { id: 6, question: 'What Facilities Does Your Hotel Have?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
  { id: 7, question: 'How Do I Book A Room For My Vacation?', answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
]

export default function FaqView() {
  const [openId, setOpenId] = useState(1)

  return (
    <div>
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">FAQ</h1>
          <NavPath items={[{ label: 'Home', to: '/' }, { label: 'Faq' }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-96 flex-shrink-0">
            <img src={faqImage} alt="FAQ" className="w-full rounded-2xl object-cover shadow-sm" />
          </div>

          <div className="flex-1 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                  <span className={`text-sm font-medium ${openId === item.id ? 'text-[#E44B26]' : 'text-gray-800'}`}>
                    {item.question}
                  </span>
                  {openId === item.id ? (
                    <ChevronDown size={16} className="text-[#E44B26] flex-shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {openId === item.id && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
