import { useState } from "react";
import heroMain from "../assets/images/hero-main.png";
import heroBg1 from "../assets/icons/hero-bg1.svg";
import heroBg2 from "../assets/icons/hero-bg2.svg";

const HERO_TAGS = ["Shopping", "Recipes", "Kitchen", "News", "Food"];

export default function HeroBlock() {
  const [email, setEmail] = useState("");
  const [activeTag, setActiveTag] = useState("Shopping");

  function handleSubscribe(e) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="bg-[#F3F4F6] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {HERO_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`
                px-4 py-1.5 rounded-full text-sm border transition-all
                ${
                  activeTag === tag
                    ? "bg-white border-gray-300 text-gray-800 font-medium shadow-sm"
                    : "border-transparent text-gray-500 hover:border-gray-200"
                }
              `}>
              {activeTag === tag && (
                <span className="text-[#E44B26] mr-1">x</span>
              )}
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-8 min-h-[300px] lg:min-h-[420px]">
          <div className="relative z-10 text-center lg:text-left">
            <p className="text-[#E44B26] font-semibold text-sm mb-2">
              100% <span className="text-gray-800">Organic Vegetables</span>
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
              The best way to
              <br />
              stuff your wallet.
            </h1>

            <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet
              reiciendis beatae consequuntur.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-0 max-w-sm mx-auto lg:mx-0">
              <div className="flex-1 flex items-center border border-gray-200 rounded-l-full bg-white px-4 gap-2 min-w-0">
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
                  className="flex-1 py-3 text-sm bg-transparent focus:outline-none text-gray-700"/>
              </div>
              <button
                type="submit"
                className="bg-[#3BB77E] hover:bg-[#2ea06c] text-white px-6 py-3 rounded-r-full
                           text-sm font-medium transition-colors flex-shrink-0">
                Subscribe
              </button>
            </form>
          </div>

          <div className="hidden lg:flex relative items-center justify-center">
            <img
              src={heroBg1}
              alt=""
              className="absolute top-4 left-4 w-16 opacity-40 pointer-events-none"/>
            <img
              src={heroBg2}
              alt=""
              className="absolute bottom-4 right-4 w-12 opacity-30 pointer-events-none"/>
            <img
              src={heroMain}
              alt="Fresh vegetables"
              className="max-h-[380px] object-contain drop-shadow-xl relative z-10"/>
          </div>
        </div>
      </div>
    </section>
  );
}
