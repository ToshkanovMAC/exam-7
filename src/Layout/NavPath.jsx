import { Link } from 'react-router-dom'

export default function NavPath({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/80">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="opacity-60">›</span>}

            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-white font-medium' : ''}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
