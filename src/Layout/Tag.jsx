const colors = {
  red:    'bg-[#E44B26] text-white',
  blue:   'bg-[#4096EE] text-white',
  green:  'bg-[#3BB77E] text-white',
  orange: 'bg-orange-500 text-white',
  pink:   'bg-pink-500 text-white',
}

function getColor(label) {
  const l = label?.toLowerCase() ?? ''
  if (l === 'hot')  return 'red'
  if (l === 'sale') return 'blue'
  if (l === 'new')  return 'green'
  if (l.startsWith('-')) return 'orange'
  if (l === 'best sell') return 'pink'
  return 'red'
}

export default function Tag({ label, color, className = '' }) {
  if (!label) return null
  const c = color ?? getColor(label)
  return (
    <span
      className={`
        inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide
        ${colors[c] ?? colors.red}
        ${className}
      `}>
      {label}
    </span>
  )
}
