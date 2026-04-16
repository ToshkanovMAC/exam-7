import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDeals } from "../Queries/productQueries";
import RatingStars from "./RatingStars";

import deal1 from "../assets/images/DealsOfTheDay1.png";
import deal2 from "../assets/images/DealsOfTheDay2.png";
import deal3 from "../assets/images/DealsOfTheDay3.png";
import deal4 from "../assets/images/DealsOfTheDay4.png";

const FALLBACK_IMAGES = [deal1, deal2, deal3, deal4];

function SkeletonDeal() {
  return (
    <div className="rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-100" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function DealsBlock() {
  const { data: rawDeals, isLoading } = useDeals(4);
  const deals = Array.isArray(rawDeals) ? rawDeals : (rawDeals?.data ?? []);

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Deals Of The Day</h2>
        <Link
          to="/shop?deals=true"
          className="text-sm text-[#E44B26] hover:underline font-medium flex items-center gap-1">
          All Deals 
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonDeal key={i} />)
          : deals.map((deal, idx) => (
              <DealCard
                key={deal.id}
                deal={deal}
                fallbackImage={FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}/>
            ))}
      </div>
    </section>
  );
}

function DealCard({ deal, fallbackImage }) {
  const { id, name, price, old_price, image_url, rating, review_count, brand } =
    deal;

  return (
    <Link
      to={`/product/${id}`}
      className="group relative rounded-xl overflow-hidden bg-gray-50 block">
      <div className="aspect-square overflow-hidden">
        <img
          src={image_url || fallbackImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          loading="lazy"/>
      </div>

      <div className="bg-white p-3">
        <p
          className="text-sm font-medium text-gray-800 line-clamp-2 mb-1
                      group-hover:text-[#E44B26] transition-colors">
          {name}
        </p>

        {brand && <p className="text-xs text-gray-400 mb-1">By {brand}</p>}

        <RatingStars rating={rating} count={review_count} />

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-[#E44B26] font-bold text-sm">${price}</span>
            {old_price && (
              <span className="text-gray-400 text-xs line-through ml-1">
                ${old_price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-1 bg-[#E44B26] hover:bg-[#c93f1e]
                       text-white text-xs px-3 py-1.5 rounded transition-colors"
            aria-label={`Add ${name} to cart`}>
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
