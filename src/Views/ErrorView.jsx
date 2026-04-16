import { Link } from 'react-router-dom'

export default function ErrorView() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-gray-100">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 -mt-4 mb-3">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-sm">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-8 py-3 rounded-lg font-medium transition-colors">Back to Home</Link>
    </div>
  )
}
