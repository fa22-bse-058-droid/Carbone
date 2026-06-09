import { motion, AnimatePresence } from 'framer-motion'
import { useCompareStore } from '../../store/useCompareStore'

export default function ComparePanel() {
  const { compareCars, isOpen, removeFromCompare, clearCompare, setOpen } = useCompareStore()

  const car1 = compareCars[0]
  const car2 = compareCars[1]

  const ROWS = [
    { label: 'Brand', get: (c: typeof car1) => c.brand },
    { label: 'Year', get: (c: typeof car1) => String(c.year) },
    { label: 'Category', get: (c: typeof car1) => c.category },
    { label: 'Fuel Type', get: (c: typeof car1) => c.fuelType },
    { label: 'Transmission', get: (c: typeof car1) => c.transmission },
    { label: 'Engine / Power', get: (c: typeof car1) => c.specs[0] ?? '—' },
    { label: 'Price', get: (c: typeof car1) => c.priceFormatted },
    { label: 'Availability', get: (c: typeof car1) => (c.inStock ? 'In Stock' : 'Sold') },
  ]

  return (
    <>
      <AnimatePresence>
        {compareCars.length > 0 && !isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed', bottom: '24px', left: '50%',
              transform: 'translateX(-50%)', zIndex: 500,
              background: '#111111', border: '1px solid rgba(201,169,110,0.3)',
              padding: '12px 24px', display: 'flex',
              alignItems: 'center', gap: '20px',
            }}
          >
            <span style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
              fontSize: '9px', letterSpacing: '0.25em',
              color: 'rgba(245,245,245,0.5)', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {compareCars.length === 1
                ? `${car1.name} — Select 1 more`
                : `${car1.name} vs ${car2?.name}`}
            </span>
            {compareCars.length === 2 && (
              <button
                onClick={() => setOpen(true)}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
                  fontSize: '9px', letterSpacing: '0.25em',
                  color: '#080808', background: '#C9A96E',
                  border: 'none', padding: '8px 16px',
                  cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}
              >
                Compare Now
              </button>
            )}
            <button
              onClick={clearCompare}
              style={{
                fontSize: '18px', color: 'rgba(245,245,245,0.3)',
                background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1,
              }}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && car1 && car2 && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.85)', zIndex: 900 }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                zIndex: 901, background: '#0f0f0f',
                borderTop: '1px solid rgba(201,169,110,0.2)',
                maxHeight: '85vh', overflowY: 'auto',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                position: 'sticky', top: 0, background: '#0f0f0f', zIndex: 1,
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                    fontSize: '9px', letterSpacing: '0.4em', color: '#C9A96E',
                    textTransform: 'uppercase', marginBottom: '4px',
                  }}>Side by Side</div>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                    fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '0.1em',
                    color: '#F5F5F5', margin: 0, textTransform: 'uppercase',
                  }}>Comparison</h2>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={clearCompare} style={{
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                    fontSize: '9px', letterSpacing: '0.2em',
                    color: 'rgba(245,245,245,0.4)', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase',
                  }}>Clear All</button>
                  <button onClick={() => setOpen(false)} style={{
                    fontSize: '20px', color: 'rgba(245,245,245,0.5)',
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                    width: '40px', height: '40px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>×</button>
                </div>
              </div>

              {/* Car images */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '1px', background: 'rgba(255,255,255,0.05)',
                margin: '32px 40px 0',
              }}>
                {[car1, car2].map((car, i) => (
                  <div key={car.id} style={{ background: '#0f0f0f', padding: '0 24px 24px', position: 'relative' }}>
                    <button onClick={() => removeFromCompare(car.id)} style={{
                      position: 'absolute', top: '12px', right: '12px',
                      width: '24px', height: '24px', background: 'rgba(8,8,8,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                      color: 'rgba(245,245,245,0.4)', cursor: 'pointer', fontSize: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                    }}>×</button>
                    <div style={{
                      fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                      fontSize: '8px', letterSpacing: '0.3em',
                      color: i === 0 ? '#C9A96E' : 'rgba(245,245,245,0.3)',
                      textTransform: 'uppercase', marginBottom: '12px',
                    }}>{i === 0 ? 'Car A' : 'Car B'}</div>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', marginBottom: '16px' }}>
                      <img src={car.image} alt={car.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                      fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '0.08em',
                      color: '#F5F5F5', margin: '0 0 4px', textTransform: 'uppercase',
                    }}>{car.name}</h3>
                    <div style={{
                      fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
                      fontSize: '14px', letterSpacing: '0.06em', color: '#C9A96E',
                    }}>{car.priceFormatted}</div>
                  </div>
                ))}
              </div>

              {/* Spec rows */}
              <div style={{ margin: '0 40px 40px' }}>
                {ROWS.map((row, i) => {
                  const val1 = row.get(car1)
                  const val2 = row.get(car2)
                  const different = val1 !== val2
                  return (
                    <div key={row.label} style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '1px', background: 'rgba(255,255,255,0.05)',
                      borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                    }}>
                      {[val1, val2].map((val, j) => (
                        <div key={j} style={{
                          background: '#0f0f0f', padding: '16px 24px',
                          display: 'flex', flexDirection: 'column', gap: '4px',
                        }}>
                          {j === 0 && (
                            <div style={{
                              fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
                              fontSize: '8px', letterSpacing: '0.3em',
                              color: 'rgba(245,245,245,0.25)',
                              textTransform: 'uppercase', marginBottom: '2px',
                            }}>{row.label}</div>
                          )}
                          <div style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: different ? 400 : 300,
                            fontSize: '12px', letterSpacing: '0.08em',
                            color: different
                              ? (row.label === 'Price' ? '#C9A96E' : '#F5F5F5')
                              : 'rgba(245,245,245,0.45)',
                            textTransform: 'capitalize',
                          }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}