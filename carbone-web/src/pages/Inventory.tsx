import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useQuery } from '@tanstack/react-query'
import { useCompareStore } from '../store/useCompareStore'
import ComparePanel from '../components/Compare/ComparePanel'
import client from '../api/client'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = 'all' | 'luxury' | 'sports' | 'electric' | 'classic' | 'suv'
type FuelType = 'all' | 'petrol' | 'diesel' | 'electric' | 'hybrid'
type SortOption = 'newest' | 'price-low' | 'price-high'

interface CarItem {
  id: number
  name: string
  brand: string
  year: number
  price: string
  price_formatted: string
  category: Exclude<Category, 'all'>
  fuel_type: Exclude<FuelType, 'all'>
  transmission: string
  specs: Record<string, string | number>
  primary_image: string
  category_display?: string
  in_stock: boolean
}

interface ApiResponse {
  count: number
  results: CarItem[]
}

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Luxury', value: 'luxury' },
  { label: 'Sports', value: 'sports' },
  { label: 'Electric', value: 'electric' },
  { label: 'Classic', value: 'classic' },
  { label: 'SUV', value: 'suv' },
]

const FUEL_TYPES: { label: string; value: FuelType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Petrol', value: 'petrol' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Electric', value: 'electric' },
  { label: 'Hybrid', value: 'hybrid' },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Inventory() {
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const { compareCars, addToCompare, removeFromCompare } = useCompareStore()

  const [category, setCategory] = useState<Category>('all')
  const [fuelType, setFuelType] = useState<FuelType>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [wishlist, setWishlist] = useState<number[]>([])

  // ─── API Fetch ───────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ['cars'],
    queryFn: async () => {
      const res = await client.get('/cars/?page_size=100')
      return res.data
    },
  })

  const ALL_CARS: CarItem[] = data?.results ?? []

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const filtered = ALL_CARS
    .filter((c) => category === 'all' || c.category === category)
    .filter((c) => fuelType === 'all' || c.fuel_type === fuelType)
    .sort((a, b) => {
      if (sort === 'price-low') return parseFloat(a.price) - parseFloat(b.price)
      if (sort === 'price-high') return parseFloat(b.price) - parseFloat(a.price)
      return b.year - a.year
    })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const isInCompare = (id: number) => compareCars.some((c) => c.id === id)
  const compareCount = compareCars.length

  const getBadge = (car: CarItem) => car.category.toUpperCase()
  const getSpecs = (car: CarItem) => {
  const s = car.specs || {}
  const engine = s.engine && s.horsepower ? `${s.engine} · ${s.horsepower} HP` : ''
  const trans = car.transmission ? car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1) : ''
  const fuel = car.fuel_type ? car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1) : ''
  return [engine, trans, fuel].filter(Boolean)
}

  const formatPrice = (car: CarItem) => {
    if (car.price_formatted) return car.price_formatted
    const p = parseFloat(car.price)
    if (p >= 10000000) return `PKR ${(p / 10000000).toFixed(1)} Cr`
    return `PKR ${(p / 100000).toFixed(0)} L`
  }

  // ─── Loading State ───────────────────────────────────────────────────────
  if (isLoading) return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: '24px', letterSpacing: '0.3em',
        color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
      }}>
        Loading Collection...
      </div>
    </div>
  )

  if (isError) return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: '24px', letterSpacing: '0.3em',
        color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
      }}>
        Failed to load. Backend running?
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      paddingTop: '100px',
      willChange: 'scroll-position',
      overflowY: 'auto',
    }}>

      {/* Header */}
      <div ref={headerRef} style={{ textAlign: 'center', padding: '60px 40px 48px' }}>
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
          fontSize: '10px', letterSpacing: '0.4em',
          color: '#C9A96E', textTransform: 'uppercase', marginBottom: '16px',
        }}>
          — Our Collection —
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '0.15em',
          color: '#F5F5F5', textTransform: 'uppercase', margin: '0 0 8px',
        }}>
          Full Inventory
        </h1>
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
          fontSize: '12px', letterSpacing: '0.2em',
          color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
        }}>
          {filtered.length} vehicles available
        </div>
      </div>

      {/* Gold divider */}
      <div style={{
        width: '60px', height: '1px',
        background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
        margin: '0 auto 48px',
      }} />

      {/* Filters */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 40px 40px',
        display: 'flex', flexWrap: 'wrap',
        gap: '32px', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '48px',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              whileHover={{ borderColor: '#C9A96E' }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                fontSize: '9px', letterSpacing: '0.3em',
                color: category === cat.value ? '#080808' : 'rgba(245,245,245,0.5)',
                background: category === cat.value ? '#C9A96E' : 'transparent',
                border: `1px solid ${category === cat.value ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                padding: '8px 16px', cursor: 'pointer',
                textTransform: 'uppercase', transition: 'all 0.3s ease',
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value as FuelType)}
            style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
              fontSize: '9px', letterSpacing: '0.2em',
              color: 'rgba(245,245,245,0.6)', background: '#111111',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px', cursor: 'pointer',
              textTransform: 'uppercase', outline: 'none',
            }}
          >
            {FUEL_TYPES.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
              fontSize: '9px', letterSpacing: '0.2em',
              color: 'rgba(245,245,245,0.6)', background: '#111111',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px', cursor: 'pointer',
              textTransform: 'uppercase', outline: 'none',
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 40px 120px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        <AnimatePresence>
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              style={{
                background: isInCompare(car.id) ? '#161410' : '#111111',
                border: isInCompare(car.id)
                  ? '1px solid rgba(201,169,110,0.5)'
                  : '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden', cursor: 'pointer',
                position: 'relative',
                opacity: car.in_stock ? 1 : 0.6,
                transform: 'translateZ(0)', willChange: 'transform',
                transition: 'background 0.3s ease, border 0.3s ease',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', inset: 0,
                  border: '1px solid #C9A96E',
                  zIndex: 10, pointerEvents: 'none',
                }}
              />

              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
                <motion.img
                  src={car.primary_image}
                  alt={car.name}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
                  fontSize: '8px', letterSpacing: '0.3em',
                  color: '#C9A96E', background: 'rgba(8,8,8,0.85)',
                  padding: '5px 10px', border: '1px solid rgba(201,169,110,0.3)',
                  textTransform: 'uppercase',
                }}>
                  {getBadge(car)}
                </div>

                {!car.in_stock && (
                  <div style={{
                    position: 'absolute', top: '14px', right: '14px',
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                    fontSize: '8px', letterSpacing: '0.2em',
                    color: 'rgba(245,245,245,0.5)', background: 'rgba(8,8,8,0.85)',
                    padding: '5px 10px', border: '1px solid rgba(255,255,255,0.1)',
                    textTransform: 'uppercase',
                  }}>
                    Sold
                  </div>
                )}

                <motion.button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(car.id) }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute', bottom: '14px', right: '14px',
                    width: '32px', height: '32px',
                    background: 'rgba(8,8,8,0.8)',
                    border: `1px solid ${wishlist.includes(car.id) ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '13px', zIndex: 5,
                  }}
                >
                  {wishlist.includes(car.id) ? '♥' : '♡'}
                </motion.button>

                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px',
                  background: 'linear-gradient(to bottom, transparent, #111111)',
                }} />
              </div>

              {/* Card content */}
              <div style={{ padding: '18px 22px 22px' }}>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                  fontSize: '9px', letterSpacing: '0.25em',
                  color: 'rgba(245,245,245,0.3)', marginBottom: '5px',
                }}>
                  {car.brand} · {car.year}
                </div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 400,
                  fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '0.06em',
                  color: '#F5F5F5', margin: '0 0 14px',
                }}>
                  {car.name}
                </h3>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
                  {getSpecs(car).map((spec, j) => (
                    <span key={j} style={{
                      fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                      fontSize: '9px', letterSpacing: '0.15em',
                      color: 'rgba(245,245,245,0.4)', textTransform: 'uppercase',
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '18px' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
                    fontSize: '15px', letterSpacing: '0.06em', color: '#C9A96E',
                  }}>
                    {formatPrice(car)}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                   <motion.button
  onClick={(e) => {
    e.stopPropagation()
    if (isInCompare(car.id)) {
      removeFromCompare(car.id)
    } else {
      addToCompare({
        id: car.id,
        name: car.name,
        brand: car.brand,
        year: car.year,
        price: parseFloat(car.price),
        priceFormatted: formatPrice(car),
        category: car.category,
        fuelType: car.fuel_type,
        transmission: car.transmission,
        specs: getSpecs(car),
        image: car.primary_image,
        badge: getBadge(car),
        inStock: car.in_stock,
      })
    }
  }}
  whileHover={{ borderColor: '#C9A96E' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
  style={{
    fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
    fontSize: '8px', letterSpacing: '0.15em',
    color: isInCompare(car.id) ? '#C9A96E' : 'rgba(245,245,245,0.35)',
    background: 'transparent',
    border: `1px solid ${isInCompare(car.id) ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.08)'}`,
    padding: '7px 10px', cursor: 'pointer',
    textTransform: 'uppercase', transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  }}
>
  {isInCompare(car.id) ? '✓ Added' : '⇄ Compare'}
</motion.button>
                    <motion.button
                      onClick={() => navigate(`/inventory/${car.id}`)}
                      whileHover={{ letterSpacing: '0.25em' }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                        fontSize: '8px', letterSpacing: '0.2em',
                        color: '#F5F5F5', background: 'transparent',
                        border: '1px solid rgba(245,245,245,0.15)',
                        padding: '7px 14px', cursor: 'pointer',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0',
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: '32px', letterSpacing: '0.15em',
            color: 'rgba(245,245,245,0.2)', textTransform: 'uppercase',
          }}>
            No vehicles match your filters
          </div>
        )}
      </div>

      <ComparePanel />
    </div>
  )
}