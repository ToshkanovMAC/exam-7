import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppFrame from '../Layout/AppFrame'

const MainView        = lazy(() => import('../Views/MainView'))
const StoreView       = lazy(() => import('../Views/StoreView'))
const ItemView        = lazy(() => import('../Views/ItemView'))
const BasketView      = lazy(() => import('../Views/BasketView'))
const OrderView       = lazy(() => import('../Views/OrderView'))
const BlogsView       = lazy(() => import('../Views/BlogsView'))
const PostView        = lazy(() => import('../Views/PostView'))
const FaqView         = lazy(() => import('../Views/FaqView'))
const AboutView       = lazy(() => import('../Views/AboutView'))
const WishlistView    = lazy(() => import('../Views/WishlistView'))
const ErrorView       = lazy(() => import('../Views/ErrorView'))
const AdminLoginView     = lazy(() => import('../Views/AdminLoginView'))
const AdminDashboardView = lazy(() => import('../Views/AdminDashboardView'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-[#E44B26] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function w(C) {
  return <Suspense fallback={<PageLoader />}><C /></Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppFrame />,
    children: [
      { index: true,        element: w(MainView) },
      { path: 'shop',       element: w(StoreView) },
      { path: 'product/:id',element: w(ItemView) },
      { path: 'cart',       element: w(BasketView) },
      { path: 'checkout',   element: w(OrderView) },
      { path: 'blog',       element: w(BlogsView) },
      { path: 'blog/:id',   element: w(PostView) },
      { path: 'faq',        element: w(FaqView) },
      { path: 'about',      element: w(AboutView) },
      { path: 'wishlist',   element: w(WishlistView) },
      { path: '*',          element: w(ErrorView) },
    ],
  },
  { path: '/admin/login', element: w(AdminLoginView) },
  { path: '/admin',       element: w(AdminDashboardView) },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
