import { create } from 'zustand'

export interface Car {
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

interface CarStore {
  cars: Car[]
  filteredCars: Car[]
  filters: {
    category: string
    fuelType: string
    sort: string
  }
  setCars: (cars: Car[]) => void
  setFilter: (key: string, value: string) => void
  applyFilters: () => void
}

export const useCarStore = create<CarStore>((set, get) => ({
  cars: [],
  filteredCars: [],
  filters: {
    category: 'all',
    fuelType: 'all',
    sort: 'newest',
  },

  setCars: (cars) => set({ cars, filteredCars: cars }),

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }))
    get().applyFilters()
  },

  applyFilters: () => {
    const { cars, filters } = get()
    let result = [...cars]

    if (filters.category !== 'all')
      result = result.filter((c) => c.category === filters.category)

    if (filters.fuelType !== 'all')
      result = result.filter((c) => c.fuelType === filters.fuelType)

    if (filters.sort === 'price-low')
      result.sort((a, b) => a.price - b.price)
    else if (filters.sort === 'price-high')
      result.sort((a, b) => b.price - a.price)
    else
      result.sort((a, b) => b.year - a.year)

    set({ filteredCars: result })
  },
}))