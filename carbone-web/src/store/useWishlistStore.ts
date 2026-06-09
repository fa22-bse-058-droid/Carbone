import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistCar {
  id: number
  name: string
  brand: string
  year: number
  price: number
  priceFormatted: string
  category: string
  fuelType: string
  transmission: string
  specs: string[]
  image: string
  badge: string
  inStock: boolean
}

interface WishlistStore {
  wishlist: WishlistCar[]
  addToWishlist: (car: WishlistCar) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (car) =>
        set((state) => {
          if (state.wishlist.find((c) => c.id === car.id)) return state
          return { wishlist: [...state.wishlist, car] }
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((c) => c.id !== id),
        })),

      isInWishlist: (id) => get().wishlist.some((c) => c.id === id),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'carbone-wishlist', // persisted to localStorage
    }
  )
)