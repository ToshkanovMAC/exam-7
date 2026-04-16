export default function RatingStars({ rating = 0, count, size = 'sm' }) {
  const starSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="flex items-center gap-1">
      <div className={`flex gap-0.5 ${starSize}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star
          const half = !filled && rating >= star - 0.5

          return (
            <span
              key={star}
              className={filled || half ? 'text-yellow-400' : 'text-gray-300'}>
              {half ? '½' : '★'}
            </span>
          )
        })}
      </div>
      {count !== undefined && (
        <span className="text-gray-400 text-xs">({count})</span>
      )}
    </div>
  )
}
