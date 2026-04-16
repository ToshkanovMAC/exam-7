import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useDailyBestSells } from "../Queries/productQueries";
import Tag from "./Tag";
import RatingStars from "./RatingStars";
import dailyBestSellsImg from "../assets/images/DailyBestSells-img.png";

const TABS = ["Featured", "Popular", "New added"];

function SliderSkeleton() {
  return (
    <div className="flex-shrink-0 w-52 border border-gray-100 rounded-lg p-3 animate-pulse">
      <div className="h-32 bg-gray-100 rounded mb-3" />
      <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-8 bg-gray-100 rounded" />
    </div>
  );
}

export default function DailyBlock() {
  const [activeTab, setActiveTab] = useState("Featured");
  const [sliderIndex, setSliderIndex] = useState(0);

  const { data: rawProducts, isLoading } = useDailyBestSells(8);
  const products = Array.isArray(rawProducts)
    ? rawProducts
    : (rawProducts?.data ?? []);

  const VISIBLE = 4;

  function slidePrev() {
    setSliderIndex((i) => Math.max(0, i - 1));
  }

  function slideNext() {
    setSliderIndex((i) => Math.min(products.length - VISIBLE, i + 1));
  }

  const canPrev = sliderIndex > 0;
  const canNext = sliderIndex < products.length - VISIBLE;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daily Best Sells</h2>

        <div className="flex gap-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSliderIndex(0);
              }}
              className={`
                text-sm transition-colors
                ${activeTab === tab
                  ? "text-[#E44B26] font-semibold"
                  : "text-gray-400 hover:text-gray-700"
                }
              `}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-5">
        <div
          className="hidden lg:flex flex-col justify-between rounded-xl overflow-hidden
                     bg-gray-900 text-white p-6 min-w-[220px] max-w-[220px] relative">
          <div>
            <h3 className="text-xl font-bold leading-snug mb-3">
              Bring nature
              <br />
              into your
              <br />
              home
            </h3>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 bg-[#E44B26] hover:bg-[#c93f1e]
                         text-white text-xs px-4 py-2 rounded transition-colors font-medium">
              Shop Now
            </Link>
          </div>
          <img
            src={dailyBestSellsImg}
            alt="Daily Best Sells"
            className="mt-4 rounded-lg object-cover w-full h-36" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="sm:hidden overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {isLoading
                ? Array.from({ length: VISIBLE }).map((_, i) => <SliderSkeleton key={i} />)
                : products.map((product) => <DailyProductCard key={product.id} product={product} />)}
            </div>
          </div>

          <div className="hidden sm:block relative overflow-hidden">
            {canPrev && (
              <button
                onClick={slidePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                           bg-white border border-gray-200 rounded-full w-8 h-8
                           flex items-center justify-center shadow hover:border-[#E44B26]
                           hover:text-[#E44B26] transition-colors"
                aria-label="Предыдущий">
                <ChevronLeft size={16} />
              </button>
            )}
            {canNext && (
              <button
                onClick={slideNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                           bg-white border border-gray-200 rounded-full w-8 h-8
                           flex items-center justify-center shadow hover:border-[#E44B26]
                           hover:text-[#E44B26] transition-colors"
                aria-label="Следующий">
                <ChevronRight size={16} />
              </button>
            )}
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(calc(-${sliderIndex * (208 + 16)}px))` }}>
              {isLoading
                ? Array.from({ length: VISIBLE }).map((_, i) => <SliderSkeleton key={i} />)
                : products.map((product) => <DailyProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DailyProductCard({ product }) {
  const { id, name, price, old_price, image_url, badge, rating, sold_count } =
    product;

  return (
    <Link
      to={`/product/${id}`}
      className="flex-shrink-0 w-52 border border-gray-100 rounded-lg p-3
                 hover:shadow-md transition-shadow group flex flex-col">
      {badge && (
        <div className="mb-2">
          <Tag label={badge} />
        </div>
      )}

      <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg mb-3 overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="max-h-full max-w-full object-contain
                     group-hover:scale-105 transition-transform duration-300"
          loading="lazy" />
      </div>

      <p
        className="text-sm font-medium text-gray-800 line-clamp-2 mb-1
                    group-hover:text-[#E44B26] transition-colors flex-1">
        {name}
      </p>

      <RatingStars rating={rating} />

      <div className="flex items-center gap-2 my-2">
        <span className="text-[#E44B26] font-bold">${price}</span>
        {old_price && (
          <span className="text-gray-400 text-xs line-through">
            ${old_price}
          </span>
        )}
      </div>

      {sold_count !== undefined && (
        <div className="mb-2">
          <div className="text-xs text-gray-400 mb-1">
            Sold: {sold_count}/120
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E44B26] rounded-full"
              style={{ width: `${Math.min((sold_count / 120) * 100, 100)}%` }} />
          </div>
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="w-full flex items-center justify-center gap-1.5
                   border border-[#E44B26] text-[#E44B26] hover:bg-[#E44B26]
                   hover:text-white text-xs py-2 rounded transition-colors">
        <ShoppingCart size={13} />
        Add To Cart
      </button>
    </Link>
  );
}
