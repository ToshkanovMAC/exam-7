import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../State/adminState'
import { useProducts, useDeleteProduct, useCreateProduct } from '../Queries/productQueries'
import { useCategories } from '../Queries/categoryQueries'
import {
  LayoutDashboard,
  Box,
  Trash2,
  LogOut,
  TrendingUp,
  ShoppingBag,
  Users,
  Search,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  Menu,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Layers,
  FileText
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AdminDashboardView() {
  const { isAuthenticated, logout } = useAdminStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    old_price: '',
    stock: '',
    category_id: '',
    description: '',
    brand: '',
    weight: '',
    image_url: 'https://jstemplate.net/wp-content/uploads/2021/05/food-placeholder.png'
  })

  const { data: productsData, isLoading, refetch } = useProducts({ limit: 100 })
  const { data: categories } = useCategories()
  const deleteMutation = useDeleteProduct()
  const createMutation = useCreateProduct()

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login')
  }, [isAuthenticated, navigate])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  if (!isAuthenticated) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDelete = (product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return
    try {
      await deleteMutation.mutateAsync(productToDelete.id)
      showNotification('Mahsulot muvaffaqiyatli o\'chirildi')
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
      await refetch()
    } catch {
      showNotification('O\'chirishda xatolik yuz berdi', 'error')
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    const slug = newProduct.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    try {
      await createMutation.mutateAsync({
        ...newProduct,
        price: Number(newProduct.price),
        old_price: newProduct.old_price ? Number(newProduct.old_price) : null,
        stock: Number(newProduct.stock),
        category_id: Number(newProduct.category_id),
        slug,
        is_new: true,
        is_featured: true,
        is_sale: false,
        rating: 5,
        review_count: 1
      })
      showNotification('Yangi mahsulot muvaffaqiyatli qo\'shildi')
      setIsModalOpen(false)
      setNewProduct({
        name: '', price: '', old_price: '', stock: '',
        category_id: '', description: '', brand: '', weight: '',
        image_url: 'https://jstemplate.net/wp-content/uploads/2021/05/food-placeholder.png'
      })
      await refetch()
    } catch {
      showNotification('Qo\'shishda xatolik yuz berdi', 'error')
    }
  }
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      fill: true,
      label: 'Sotuvlar',
      data: [12, 19, 15, 22, 30, 25, 35],
      borderColor: '#E44B26',
      backgroundColor: 'rgba(228, 75, 38, 0.1)',
      tension: 0.4,
    }],
  }

  const catMap = {}
  productsData?.data?.forEach(p => {
    const catName = p.categories?.name || 'Boshqa'
    catMap[catName] = (catMap[catName] || 0) + 1
  })

  const doughnutData = {
    labels: Object.keys(catMap).slice(0, 5),
    datasets: [{
      data: Object.values(catMap).slice(0, 5),
      backgroundColor: ['#E44B26', '#3BB77E', '#FDC040', '#81B13D', '#539165'],
      borderWidth: 0,
    }],
  }

  const sortedByStock = productsData?.data ? [...productsData.data].sort((a, b) => b.stock - a.stock).slice(0, 8) : []
  const barData = {
    labels: sortedByStock.map(p => p.name.substring(0, 10)),
    datasets: [{
      label: 'Zaxira',
      data: sortedByStock.map(p => p.stock),
      backgroundColor: '#3BB77E',
      borderRadius: 8,
    }],
  }

  const radarData = {
    labels: ['Tezlik', 'Xizmat', 'Sifat', 'Narx', 'Logistika', 'Baho'],
    datasets: [{
      label: 'Ko\'rsatkichlar',
      data: [85, 90, 75, 80, 70, 95],
      backgroundColor: 'rgba(253, 192, 64, 0.2)',
      borderColor: '#FDC040',
    }],
  }

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<TrendingUp className="text-green-500" />} title="Jami sotuvlar" value="128.5 mln" tendency="+12.5%" />
        <StatCard icon={<ShoppingBag className="text-blue-500" />} title="Buyurtmalar" value="1,240" tendency="+5.2%" />
        <StatCard icon={<Box className="text-[#E44B26]" />} title="Mahsulotlar" value={productsData?.total || '0'} tendency="+24" />
        <StatCard icon={<Users className="text-purple-500" />} title="Mijozlar" value="856" tendency="+8.1%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <ChartContainer title="Sotuvlar dinamikasi"><div className="h-64"><Line data={lineData} options={chartOptions} /></div></ChartContainer>
        <ChartContainer title="Kategoriyalar bo'yicha"><div className="h-64"><Doughnut data={doughnutData} options={chartOptions} /></div></ChartContainer>
        <ChartContainer title="Ombor qoldig'i"><div className="h-64"><Bar data={barData} options={chartOptions} /></div></ChartContainer>
        <ChartContainer title="KPI Ko'rsatkichlar"><div className="h-64"><Radar data={radarData} options={chartOptions} /></div></ChartContainer>
      </div>

      {renderProductsTable()}
    </>
  )

  const renderProductsTable = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-800">Barcha mahsulotlar</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#E44B26] text-white rounded-xl hover:bg-[#c93d1b] transition-all font-bold text-sm shadow-md">
          <Plus size={18} /> Yangi qo'shish
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 text-left">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Mahsulot</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Kategoriya</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Narx</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Zaxira</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto text-[#E44B26]" /></td></tr>
            ) : productsData?.data?.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={product.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span className="font-semibold text-sm text-gray-800">{product.name}</span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600">{product.categories?.name}</td>
                <td className="px-6 py-4 font-bold text-sm">{product.price?.toLocaleString()} so'm</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.stock} dona</td>
                <td className="px-6 py-4 text-right">
                  <button
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(product)}
                    className={`p-2 rounded-lg transition-all ${deleteMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex text-gray-900 border-none">
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-30">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E44B26] rounded-lg flex items-center justify-center text-white shadow-lg">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">Admin<span className="text-[#E44B26]">Panel</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Boshqaruv" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Box size={20} />} label="Mahsulotlar" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Chiqish
          </button>
        </div>
      </aside>

      {mobileSidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)} />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E44B26] rounded-lg flex items-center justify-center text-white shadow-lg">
                  <LayoutDashboard size={20} />
                </div>
                <span className="font-extrabold text-xl tracking-tight">Admin<span className="text-[#E44B26]">Panel</span></span>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 mt-4">
              <NavItem icon={<LayoutDashboard size={20} />} label="Boshqaruv" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false) }} />
              <NavItem icon={<Box size={20} />} label="Mahsulotlar" active={activeTab === 'products'} onClick={() => { setActiveTab('products'); setMobileSidebarOpen(false) }} />
            </nav>
            <div className="p-4 border-t border-gray-50">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
                <LogOut size={20} /> Chiqish
              </button>
            </div>
          </aside>
        </>
      )}

      <main className="flex-1 relative min-w-0">
        {notification && (
          <div className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-6 sm:top-6 z-50 flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
            {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold text-sm sm:text-base">{notification.message}</span>
          </div>
        )}

        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 sm:h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-[#E44B26] transition-colors p-1 flex-shrink-0">
            <Menu size={22} />
          </button>

          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text" placeholder="Qidiruv..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#E44B26]/20 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E44B26] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 sm:border-4 border-white shadow-md">A</div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-black text-gray-800 uppercase tracking-tight">{activeTab === 'dashboard' ? 'Asosiy Panel' : 'Mahsulotlar'}</h2>
            <p className="text-gray-500 font-medium text-sm sm:text-base">Xush kelibsiz! Barcha ma'lumotlar nazorat ostida.</p>
          </div>

          {activeTab === 'dashboard' ? renderDashboard() : renderProductsTable()}
        </div>
      </main>

      {
        isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
              <div className="p-6 bg-[#E44B26] text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2"><Plus /> Yangi mahsulot qo'shish</h3>
                <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform"><X /></button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  <InputGroup label="Mahsulot nomi" icon={<Box size={18} />} value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Masalan: Olma" required />

                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Narxi" icon={<DollarSign size={18} />} type="number" value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="5000" required />
                    <InputGroup label="Eski narxi" icon={<DollarSign size={18} />} type="number" value={newProduct.old_price}
                      onChange={e => setNewProduct({ ...newProduct, old_price: e.target.value })} placeholder="6000" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Zaxira" icon={<Layers size={18} />} type="number" value={newProduct.stock}
                      onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="100" required />
                    <InputGroup label="Brend" icon={<Tag size={18} />} value={newProduct.brand}
                      onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} placeholder="Masalan: Nestle" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1"><Tag size={12} /> Kategoriya</label>
                      <select
                        required
                        value={newProduct.category_id}
                        onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E44B26] outline-none">
                        <option value="">Tanlang...</option>
                        {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <InputGroup label="Vazni" icon={<Box size={18} />} value={newProduct.weight}
                      onChange={e => setNewProduct({ ...newProduct, weight: e.target.value })} placeholder="200gm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1"><FileText size={12} /> Tavsif</label>
                    <textarea
                      value={newProduct.description}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Mahsulot haqida batafsil ma'lumot..."
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E44B26] outline-none transition-all resize-none"
                    />
                  </div>

                  <InputGroup label="Rasm URL" icon={<ImageIcon size={18} />} value={newProduct.image_url}
                    onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })} placeholder="https://..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all">Bekor qilish</button>
                  <button type="submit" disabled={createMutation.isPending} className="flex-1 py-4 bg-[#E44B26] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all disabled:opacity-50">
                    {createMutation.isPending ? <Loader2 className="animate-spin mx-auto" /> : 'Saqlash'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">O'chirishni tasdiqlang</h3>
                <p className="text-gray-500 font-medium mb-8">
                  Haqiqatdan ham <span className="text-gray-800 font-bold">"{productToDelete?.name}"</span> mahsulotini o'chirmoqchimisiz? Bu amalni orqaga qaytarib bo'lmaydi.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all">
                    Bekor qilish
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteMutation.isPending}
                    className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:translate-y-[-2px] transition-all disabled:opacity-50">
                    {deleteMutation.isPending ? <Loader2 className="animate-spin mx-auto" /> : "Ha, o'chirilsin"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

function InputGroup({ label, icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">{icon} {label}</label>
      <input
        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#E44B26] outline-none transition-all"
        {...props} />
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E44B26] text-white font-black shadow-lg shadow-[#E44B26]/30' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
      }`}>
      {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function StatCard({ icon, title, value, tendency }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4"><div className="p-3 bg-gray-50 rounded-xl">{icon}</div><span className={`text-xs font-bold px-2 py-1 rounded-lg ${tendency.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{tendency}</span></div>
      <p className="text-sm text-gray-400 font-bold mb-1">{title}</p><h4 className="text-2xl font-black text-gray-900">{value}</h4>
    </div>
  )
}

function ChartContainer({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-black text-gray-800 text-lg mb-6 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}
