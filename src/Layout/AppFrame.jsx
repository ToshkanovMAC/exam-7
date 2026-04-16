import { Outlet, ScrollRestoration } from 'react-router-dom'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

export default function AppFrame() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <BottomBar />

      <ScrollRestoration />
    </div>
  )
}
