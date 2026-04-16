import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.find((p) => p.id === product.id)
        if (!exists) set((s) => ({ items: [...s.items, product] }))
      },

      removeItem: (productId) => {
        set((s) => ({ items: s.items.filter((p) => p.id !== productId) }))
      },

      toggleItem: (product) => {
        const exists = get().items.find((p) => p.id === product.id)
        if (exists) {
          set((s) => ({ items: s.items.filter((p) => p.id !== product.id) }))
        } else {
          set((s) => ({ items: [...s.items, product] }))
        }
      },

      isInWishlist: (productId) => get().items.some((p) => p.id === productId),

      getTotalItems: () => get().items.length,

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'wishlist-storage' }
  )
)

export default useWishlistStore
