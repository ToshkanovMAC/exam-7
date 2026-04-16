import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../State/adminState'
import { LogIn, Lock, User, AlertCircle } from 'lucide-react'

export default function AdminLoginView() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAdminStore((state) => state.login)
  const navigate = useNavigate()
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) navigate('/admin')
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/admin')
    } else {
      setError('Noto\'g\'ri login yoki parol')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-red-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl z-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#E44B26] to-[#ff6b4a] rounded-xl shadow-lg mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 mt-2">Boshqaruv tizimiga xush kelibsiz</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm animate-shake">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Login</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="admin"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E44B26] focus:border-[#E44B26] outline-none transition-all text-gray-800 bg-gray-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required/>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Parol</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="admin"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E44B26] focus:border-[#E44B26] outline-none transition-all text-gray-800 bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E44B26] to-[#ff6b4a] hover:from-[#c93d1b] hover:to-[#e44b26] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all active:scale-[0.98]">
            Kirish
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Exam-7 Dashboard</p>
        </div>
      </div>
    </div>
  )
}
