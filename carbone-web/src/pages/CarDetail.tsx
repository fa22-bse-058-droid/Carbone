import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import client from '../api/client'

type ViewTab = 'photos' | '3d'

const MODEL_MAP: Record<number, string> = {
  1: '/models/mercedes-eclass.glb',
  2: '/models/mercedes-eclass.glb',
  3: '/models/mercedes-eclass.glb',
  4: '/models/mercedes-eclass.glb',
  5: '/models/mercedes-eclass.glb',
  6: '/models/mercedes-eclass.glb',
  7: '/models/honda-civic-type-r.glb',
  8: '/models/honda-civic-type-r.glb',
  9: '/models/honda-civic-type-r.glb',
  10: '/models/tesla-model3.glb',
  11: '/models/tesla-model3.glb',
  12: '/models/tesla-model3.glb',
  13: '/models/aston-vulcan.glb',
  14: '/models/aston-vulcan.glb',
  15: '/models/aston-vulcan.glb',
  16: '/models/honda-s800.glb',
  17: '/models/honda-s800.glb',
  18: '/models/honda-s800.glb',
}

interface CarSpecs {
  engine: string
  horsepower: number
  torque: string
  top_speed: string
  acceleration: string
  drivetrain: string
}

interface CarImage {
  id: number
  image_url: string
  is_primary: boolean
  order: number
}

interface Car {
  id: number
  name: string
  brand: string
  model: string
  year: number
  price: string
  price_formatted: string
  category: string
  condition: string
  mileage: number
  fuel_type: string
  transmission: string
  color: string
  features: string[]
  specs: CarSpecs
  in_stock: boolean
  is_featured: boolean
  primary_image: string
  images: CarImage[]
}

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: car, isLoading, isError } = useQuery<Car>({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await client.get(`/cars/${id}/`)
      return res.data
    },
  })

  const [activeImage, setActiveImage] = useState(0)
  const [viewTab, setViewTab] = useState<ViewTab>('photos')
  const [emiPrincipal, setEmiPrincipal] = useState(0)
  const [emiTenure, setEmiTenure] = useState(36)
  const [emiRate, setEmiRate] = useState(12)
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', date: '', time: '' })
  const [formSent, setFormSent] = useState(false)

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', letterSpacing: '0.3em', color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase' }}>Loading...</div>
    </div>
  )

  if (isError || !car) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', letterSpacing: '0.3em', color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase' }}>Car not found</div>
    </div>
  )

  const modelSrc = MODEL_MAP[car.id] || null

  const allImages = car.images.length > 0
    ? car.images.map(img => img.image_url)
    : [car.primary_image]

  const principal = emiPrincipal || parseFloat(car.price) * 0.8
  const monthlyRate = emiRate / 100 / 12
  const emi = monthlyRate === 0
    ? principal / emiTenure
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, emiTenure)) / (Math.pow(1 + monthlyRate, emiTenure) - 1)

  const formatPrice = () => {
    if (car.price_formatted) return car.price_formatted
    const p = parseFloat(car.price)
    if (p >= 10000000) return `PKR ${(p / 10000000).toFixed(1)} Cr`
    return `PKR ${(p / 100000).toFixed(0)} L`
  }

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.name} (${formatPrice()}) listed on Carbone. Please share more details.`
  )

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await client.post('/bookings/', {
        car: car.id,
        name: bookingForm.name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        date: bookingForm.date,
        time_slot: bookingForm.time,
      })
      setFormSent(true)
    } catch (err) {
      console.error('Booking failed:', err)
    }
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#F5F5F5', fontFamily: 'Montserrat, sans-serif', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 120px' }}>

        {/* Back */}
        <motion.button onClick={() => navigate('/inventory')} whileHover={{ x: -4 }} style={{ background: 'none', border: 'none', color: '#888', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.15em', cursor: 'pointer', marginBottom: '48px', padding: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ← BACK TO INVENTORY
        </motion.button>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '100px' }}>

          {/* Left — Images + 3D */}
          <div>
            {/* Tab switcher */}
            {modelSrc && (
              <div style={{ display: 'flex', marginBottom: '16px', border: '1px solid #1a1a1a', width: 'fit-content' }}>
                {(['photos', '3d'] as ViewTab[]).map((tab) => (
                  <button key={tab} onClick={() => setViewTab(tab)} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer', border: 'none', background: viewTab === tab ? '#C9A96E' : 'transparent', color: viewTab === tab ? '#080808' : 'rgba(245,245,245,0.4)', transition: 'all 0.3s ease' }}>
                    {tab === 'photos' ? '📷 Photos' : '⟳ View in 3D'}
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
  {/* Photos */}
  {viewTab === 'photos' && (
    <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div style={{ overflow: 'hidden', border: '1px solid #1a1a1a', height: '400px' }}>
  <img 
    src={allImages[0]} 
    alt={car.name} 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'contain',
      background: '#0d0d0d',
    }} 
  />
</div>
    </motion.div>
  )}

              {/* 3D Viewer */}
              {viewTab === '3d' && modelSrc && (
                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#0d0d0d', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                    {/* @ts-ignore */}
                    <model-viewer
                      src={modelSrc}
                      alt={`3D model of ${car.name}`}
                      auto-rotate
                      camera-controls
                      shadow-intensity="1"
                      exposure="0.8"
                      style={{ width: '100%', height: '100%', background: 'transparent', '--progress-bar-color': '#C9A96E' } as React.CSSProperties}
                    >
                      <div slot="poster" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', background: '#0d0d0d' }}>
                        <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.4em', color: '#C9A96E', textTransform: 'uppercase' }}>Loading 3D Model</div>
                        <div style={{ width: '40px', height: '1px', background: '#C9A96E' }} />
                      </div>
                    </model-viewer>
                    <div style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '8px', letterSpacing: '0.3em', color: '#C9A96E', background: 'rgba(8,8,8,0.85)', border: '1px solid rgba(201,169,110,0.3)', padding: '5px 10px', textTransform: 'uppercase', pointerEvents: 'none' }}>
                      3D · Drag to Rotate
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '12px', justifyContent: 'center' }}>
                    {['🖱 Drag to rotate', '🔍 Scroll to zoom', '✋ Right-click to pan'].map((hint) => (
                      <div key={hint} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(245,245,245,0.25)', textTransform: 'uppercase' }}>{hint}</div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', color: '#C9A96E', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.3)', padding: '5px 12px', textTransform: 'uppercase' }}>{car.category}</span>
              {!car.in_stock && (<span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: '#888', border: '1px solid #333', padding: '5px 12px', textTransform: 'uppercase' }}>SOLD</span>)}
              {modelSrc && (<span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.25)', padding: '5px 12px', textTransform: 'uppercase' }}>✦ 3D Available</span>)}
            </div>

            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '0.08em', color: '#F5F5F5', margin: '0 0 8px', lineHeight: 1.1 }}>{car.name}</h1>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(245,245,245,0.35)', marginBottom: '28px', textTransform: 'uppercase' }}>
              {car.brand} · {car.year} · {car.condition} · {car.mileage.toLocaleString()} km
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '28px', color: '#C9A96E', letterSpacing: '0.06em', marginBottom: '36px' }}>{formatPrice()}</div>
            <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '28px' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '36px' }}>
              {[
                { label: 'Engine', value: car.specs?.engine },
                { label: 'Power', value: car.specs?.horsepower ? `${car.specs.horsepower} HP` : '-' },
                { label: 'Torque', value: car.specs?.torque },
                { label: '0–100', value: car.specs?.acceleration },
                { label: 'Top Speed', value: car.specs?.top_speed },
                { label: 'Drive', value: car.specs?.drivetrain },
              ].map((spec, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #1a1a1a', padding: '14px 16px' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#555', textTransform: 'uppercase', marginBottom: '6px' }}>{spec.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F5F5' }}>{spec.value || '-'}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#555', marginBottom: '32px', textTransform: 'uppercase', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span>{car.fuel_type}</span><span>·</span><span>{car.transmission}</span><span>·</span><span>{car.color}</span>
            </div>

            <motion.a href={`https://wa.me/923001234567?text=${whatsappMsg}`} target="_blank" rel="noreferrer" whileHover={{ background: '#1ebe57' }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '16px 32px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px', width: '100%', boxSizing: 'border-box' as const }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              INQUIRE ON WHATSAPP
            </motion.a>

            <motion.button whileHover={{ borderColor: '#C9A96E', color: '#C9A96E' }} transition={{ duration: 0.2 }} style={{ display: 'block', width: '100%', background: 'transparent', color: '#888', padding: '14px 32px', border: '1px solid #333', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', boxSizing: 'border-box' as const }} onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              BOOK A TEST DRIVE
            </motion.button>
          </motion.div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', letterSpacing: '0.1em', color: '#F5F5F5', marginBottom: '8px' }}>Features & Equipment</h2>
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {(car.features || []).map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ background: '#111', border: '1px solid #1a1a1a', padding: '14px 18px', fontSize: '12px', color: '#F5F5F5', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.05em' }}>
                <span style={{ color: '#C9A96E', fontSize: '8px' }}>◆</span>{f}
              </motion.div>
            ))}
          </div>
        </div>

        {/* EMI Calculator */}
        <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '48px', marginBottom: '100px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', letterSpacing: '0.1em', color: '#F5F5F5', marginBottom: '8px' }}>Finance Calculator</h2>
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '36px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {[
              { label: 'Loan Amount (PKR)', value: emiPrincipal || Math.round(parseFloat(car.price) * 0.8), setter: setEmiPrincipal, step: 100000 },
              { label: 'Tenure (Months)', value: emiTenure, setter: setEmiTenure, step: 1 },
              { label: 'Interest Rate (% / year)', value: emiRate, setter: setEmiRate, step: 0.5 },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{field.label}</label>
                <input type="number" value={field.value} step={field.step} onChange={e => field.setter(Number(e.target.value))} style={{ width: '100%', background: '#080808', border: '1px solid #333', color: '#F5F5F5', padding: '12px 16px', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', boxSizing: 'border-box' as const, outline: 'none' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '36px', background: '#080808', border: '1px solid rgba(201,169,110,0.3)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>ESTIMATED MONTHLY INSTALLMENT</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '52px', color: '#C9A96E', letterSpacing: '0.05em' }}>PKR {Math.round(emi).toLocaleString()}</div>
            <div style={{ fontSize: '11px', color: '#555', letterSpacing: '0.1em', marginTop: '12px' }}>Over {emiTenure} months · {emiRate}% per annum</div>
          </div>
        </div>

        {/* Test Drive Booking */}
        <div id="booking" style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', letterSpacing: '0.1em', color: '#F5F5F5', marginBottom: '8px' }}>Book a Test Drive</h2>
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '36px' }} />
          {formSent ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '64px', background: '#111', border: '1px solid rgba(201,169,110,0.3)' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '32px', color: '#C9A96E', letterSpacing: '0.1em', marginBottom: '16px' }}>Request Received</div>
              <div style={{ fontSize: '12px', color: '#888', letterSpacing: '0.1em', lineHeight: 1.8 }}>Our concierge team will contact you within 24 hours<br />to confirm your appointment for the {car.name}.</div>
            </motion.div>
          ) : (
            <form onSubmit={handleBooking}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {[
                  { label: 'Full Name', type: 'text', key: 'name', placeholder: 'Your full name' },
                  { label: 'Phone Number', type: 'tel', key: 'phone', placeholder: '+92 300 0000000' },
                  { label: 'Email Address', type: 'email', key: 'email', placeholder: 'your@email.com' },
                  { label: 'Preferred Date', type: 'date', key: 'date', placeholder: '' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{field.label}</label>
                    <input type={field.type} required placeholder={field.placeholder} value={bookingForm[field.key as keyof typeof bookingForm]} onChange={e => setBookingForm({ ...bookingForm, [field.key]: e.target.value })} style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#F5F5F5', padding: '14px 16px', fontFamily: 'Montserrat, sans-serif', fontSize: '13px', boxSizing: 'border-box' as const, outline: 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Preferred Time Slot</label>
                <select required value={bookingForm.time} onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })} style={{ width: '100%', background: '#111', border: '1px solid #333', color: bookingForm.time ? '#F5F5F5' : '#555', padding: '14px 16px', fontFamily: 'Montserrat, sans-serif', fontSize: '13px', boxSizing: 'border-box' as const, outline: 'none' }}>
                  <option value="">Select a time slot</option>
                  {['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <motion.button type="submit" whileHover={{ background: '#C9A96E', color: '#080808' }} transition={{ duration: 0.2 }} style={{ width: '100%', background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E', padding: '18px', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', boxSizing: 'border-box' as const }}>
                CONFIRM TEST DRIVE
              </motion.button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}