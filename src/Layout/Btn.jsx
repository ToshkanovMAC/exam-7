const variants = {
  primary: 'bg-[#E44B26] hover:bg-[#c93f1e] text-white',
  outline: 'border border-[#E44B26] text-[#E44B26] hover:bg-[#E44B26] hover:text-white',
  ghost: 'text-gray-600 hover:text-[#E44B26] hover:bg-gray-50',
  green: 'bg-[#3BB77E] hover:bg-[#2ea06c] text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

export default function Btn({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 rounded-md font-medium
        transition-colors duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}>
      {children}
    </button>
  )
}
