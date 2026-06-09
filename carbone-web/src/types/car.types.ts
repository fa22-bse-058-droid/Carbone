export interface CarImage {
  id: number
  image_url: string
  is_primary: boolean
  order: number
}

export interface Car {
  id: number
  name: string
  brand: string
  model: string
  year: number
  price: string
  price_formatted: string
  category: 'luxury' | 'sports' | 'electric' | 'classic' | 'suv' | 'used'
  condition: 'new' | 'used'
  mileage: number
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  transmission: 'automatic' | 'manual'
  color: string
  features: string[]
  specs: {
    engine: string
    horsepower: number
    torque: string
    top_speed: string
    acceleration: string
    drivetrain: string
  }
  in_stock: boolean
  is_featured: boolean
  primary_image: string
  images: CarImage[]
}

export interface CarsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Car[]
}