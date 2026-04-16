export default function PageNav({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  function getPages() {
    const pages = []
    const delta = 2

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div className="flex items-center gap-1 justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded border border-gray-200 text-gray-600
                   hover:border-[#E44B26] hover:text-[#E44B26] disabled:opacity-40
                   disabled:cursor-not-allowed transition-colors">
        Previous
      </button>

      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-8 h-8 text-sm rounded border transition-colors
              ${
                page === currentPage
                  ? 'bg-[#E44B26] border-[#E44B26] text-white'
                  : 'border-gray-200 text-gray-600 hover:border-[#E44B26] hover:text-[#E44B26]'
              }
            `}>
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded border border-gray-200 text-gray-600
                   hover:border-[#E44B26] hover:text-[#E44B26] disabled:opacity-40
                   disabled:cursor-not-allowed transition-colors">
        Next
      </button>
    </div>
  )
}
