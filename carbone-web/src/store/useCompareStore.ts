import { create } from 'zustand'

export interface CompareCarItem {
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

interface CompareStore {
  compareCars: CompareCarItem[]
  isOpen: boolean
  addToCompare: (car: CompareCarItem) => void
  removeFromCompare: (id: number) => void
  clearCompare: () => void
  setOpen: (open: boolean) => void
}

export const useCompareStore = create<CompareStore>((set) => ({
  compareCars: [],
  isOpen: false,
  addToCompare: (car) =>
    set((state) => {
      if (state.compareCars.find((c) => c.id === car.id)) return state
      const updated = state.compareCars.length >= 2
        ? [...state.compareCars.slice(1), car]
        : [...state.compareCars, car]
      return { compareCars: updated, isOpen: updated.length === 2 }
    }),
  removeFromCompare: (id) =>
    set((state) => {
      const updated = state.compareCars.filter((c) => c.id !== id)
      return { compareCars: updated, isOpen: updated.length === 2 }
    }),
  clearCompare: () => set({ compareCars: [], isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
}))