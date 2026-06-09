import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useQuery } from '@tanstack/react-query'
import client from '../../api/client'

gsap.registerPlugin(ScrollTrigger)

interface Car {
  id: number
  name: string
  brand: string
  year: number
  price: string
  price_formatted: string
  category: string
  fuel_type: string
  transmission: string
  specs: Record<string, string | number>
  primary_image: string
  in_stock: boolean
}

export default function FeaturedCars() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery<{ results: Car[] }>({
    queryKey: ['featured-cars'],
    queryFn: async () => {
      const res = await client.get('/cars/featured/')
      // featured/ returns array directly, not paginated
      return Array.isArray(res.data)
        ? { results: res.data }
        : res.data
    },
  })

  const FEATURED_CARS = data?.results ?? []

  useEffect(() => {
    gsap.set([labelRef.current, headingRef.current, lineRef.current], { opacity: 0, y: 30 })
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to([labelRef.current, headingRef.current, lineRef.current], {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
        })
      },
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const formatPrice = (car: Car) => {
    if (car.price_formatted) return car.price_formatted
    const p = parseFloat(car.price)
    if (p >= 10000000) return `PKR ${(p / 10000000).toFixed(1)} Cr`
    return `PKR ${(p / 100000).toFixed(0)} L`
  }

  const getSpecs = (car: Car) => {
    const s = car.specs || {}
    return [
      s.engine && s.horsepower ? `${s.engine} · ${s.horsepower} HP` : '',
      car.transmission ? car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1) : '',
      car.fuel_type ? car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1) : '',
    ].filter(Boolean)
  }

  return (
    <section ref={sectionRef} style={{ background: '#080808', padding: '80px 40px 120px' }}>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div ref={labelRef} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.4em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: '16px' }}>
          — Handpicked For You —
        </div>
        <h2 ref={headingRef} style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '0.15em', color: '#F5F5F5', textTransform: 'uppercase', margin: '0 0 24px', lineHeight: 1.1 }}>
          Featured Collection
        </h2>
        <div ref={lineRef} style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #C9A96E, transparent)', margin: '0 auto' }} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', letterSpacing: '0.3em', color: 'rgba(245,245,245,0.2)', textTransform: 'uppercase' }}>
          Loading...
        </div>
      )}

      {/* Cards grid */}
      {!isLoading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {FEATURED_CARS.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/inventory/${car.id}`)}
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
            >
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0, border: '1px solid #C9A96E', zIndex: 10, pointerEvents: 'none' }} />

              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
                <motion.img
                  src={car.primary_image}
                  alt={car.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.3em', color: '#C9A96E', background: 'rgba(8,8,8,0.8)', padding: '6px 12px', border: '1px solid rgba(201,169,110,0.3)', textTransform: 'uppercase' }}>
                  {car.category.toUpperCase()}
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, transparent, #111111)' }} />
              </div>

              {/* Card content */}
              <div style={{ padding: '20px 24px 24px' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(245,245,245,0.35)', marginBottom: '6px' }}>
                  {car.year}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(22px, 2.5vw, 28px)', letterSpacing: '0.08em', color: '#F5F5F5', margin: '0 0 16px' }}>
                  {car.name}
                </h3>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {getSpecs(car).map((spec, j) => (
                    <span key={j} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,245,245,0.45)', textTransform: 'uppercase' }}>
                      {spec}
                    </span>
                  ))}
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: 'clamp(14px, 1.5vw, 16px)', letterSpacing: '0.08em', color: '#C9A96E' }}>
                    {formatPrice(car)}
                  </div>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); navigate(`/inventory/${car.id}`) }}
                    whileHover={{ letterSpacing: '0.25em' }}
                    transition={{ duration: 0.3 }}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.2em', color: '#F5F5F5', background: 'transparent', border: '1px solid rgba(245,245,245,0.2)', padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View Full Inventory CTA */}
      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <motion.button
          onClick={() => navigate('/inventory')}
          whileHover={{ backgroundColor: '#C9A96E', color: '#080808' }}
          transition={{ duration: 0.3 }}
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: '#F5F5F5', background: 'transparent', border: '1px solid rgba(201,169,110,0.4)', padding: '16px 48px', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          View Full Inventory
        </motion.button>
      </div>
    </section>
  )
}