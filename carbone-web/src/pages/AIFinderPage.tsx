import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'

interface Question {
  id: number
  question: string
  options: { label: string; value: string }[]
}

interface CarResult {
  id: number
  name: string
  brand: string
  year: number
  price_formatted: string
  primary_image: string
  reason: string
  match_score: number
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What is your budget?',
    options: [
      { label: '50L – 1 Crore', value: '50l-1cr' },
      { label: '1 Crore – 2 Crore', value: '1cr-2cr' },
      { label: 'Above 2 Crore', value: 'above-2cr' },
    ],
  },
  {
    id: 2,
    question: 'How will you use it?',
    options: [
      { label: 'City Commute', value: 'city' },
      { label: 'Highway Cruising', value: 'highway' },
      { label: 'Weekend Sports', value: 'sports' },
    ],
  },
  {
    id: 3,
    question: 'What is your vibe?',
    options: [
      { label: 'Practical', value: 'practical' },
      { label: 'Sporty', value: 'sporty' },
      { label: 'Ultra Luxury', value: 'ultra_luxury' },
    ],
  },
]
export default function AIFinderPage() {
  const navigate = useNavigate()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CarResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSelect = (value: string) => setSelected(value)

  const handleNext = async () => {
    if (!selected) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      // All 3 answers done — call API
      setLoading(true)
      setError(null)
      try {
        const res = await client.post('/ai-finder/', {
          budget: newAnswers[0],
          use_case: newAnswers[1],
          vibe: newAnswers[2],
        })
        setResults(res.data.recommendations)
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error || 'Something went wrong. Please try again.'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers([])
    setSelected(null)
    setResults(null)
    setLoading(false)
    setError(null)
  }

  const formatPrice = (car: CarResult) => {
    if (car.price_formatted) return car.price_formatted
    return ''
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Back button */}
      <button onClick={() => navigate('/')} style={{ position: 'fixed', top: '72px', left: '40px', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(245,245,245,0.4)', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase', zIndex: 100 }}>
        ← Back
      </button>

      <AnimatePresence mode="wait">

        {/* Loading */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.4em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: '32px' }}>
              — Consulting the AI Concierge —
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A96E' }} />
              ))}
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.15em', color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase', marginTop: '32px' }}>
              Finding your perfect match...
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', letterSpacing: '0.1em', color: 'rgba(245,245,245,0.4)', marginBottom: '32px' }}>
              {error}
            </div>
            <motion.button onClick={handleReset} whileHover={{ backgroundColor: '#C9A96E', color: '#080808' }} transition={{ duration: 0.3 }} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: '#F5F5F5', background: 'transparent', border: '1px solid rgba(201,169,110,0.4)', padding: '14px 40px', cursor: 'pointer', textTransform: 'uppercase' }}>
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Results */}
        {results && !loading && (
          <motion.div key="results" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} style={{ width: '100%', maxWidth: '1100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.4em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: '16px' }}>
                — Your AI Recommendations —
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '0.12em', color: '#F5F5F5', textTransform: 'uppercase', margin: 0 }}>
                Curated For You
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
              {results.map((car, i) => (
                <motion.div key={car.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.15 }} onClick={() => navigate(`/inventory/${car.id}`)} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={car.primary_image} alt={car.name} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '20px 24px 28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.3em', color: '#C9A96E', textTransform: 'uppercase' }}>
                        #{i + 1} Match
                      </div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.6)', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', padding: '3px 8px' }}>
                        {car.match_score}% Match
                      </div>
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '0.08em', color: '#F5F5F5', margin: '0 0 8px' }}>
                      {car.name}
                    </h3>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '14px', color: '#C9A96E', marginBottom: '16px', letterSpacing: '0.05em' }}>
                      {formatPrice(car)}
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '16px' }} />
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '12px', letterSpacing: '0.05em', color: 'rgba(245,245,245,0.5)', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                      "{car.reason}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <motion.button onClick={handleReset} whileHover={{ backgroundColor: '#C9A96E', color: '#080808' }} transition={{ duration: 0.3 }} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: '#F5F5F5', background: 'transparent', border: '1px solid rgba(201,169,110,0.4)', padding: '14px 40px', cursor: 'pointer', textTransform: 'uppercase' }}>
                Start Over
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Quiz */}
        {!loading && !results && !error && (
          <motion.div key={`question-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} style={{ width: '100%', maxWidth: '640px', textAlign: 'center' }}>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '64px' }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{ width: '40px', height: '1px', background: i <= currentQ ? '#C9A96E' : 'rgba(255,255,255,0.1)', transition: 'background 0.4s ease' }} />
              ))}
            </div>

            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.4em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: '16px' }}>
              Question {currentQ + 1} of {QUESTIONS.length}
            </div>

            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.1em', color: '#F5F5F5', textTransform: 'uppercase', margin: '0 0 56px', lineHeight: 1.1 }}>
              {QUESTIONS[currentQ].question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              {QUESTIONS[currentQ].options.map((opt) => (
                <motion.button key={opt.value} onClick={() => handleSelect(opt.value)} whileHover={{ x: 8 }} transition={{ duration: 0.2 }} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '12px', letterSpacing: '0.25em', color: selected === opt.value ? '#080808' : '#F5F5F5', background: selected === opt.value ? '#C9A96E' : 'transparent', border: `1px solid ${selected === opt.value ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`, padding: '18px 32px', cursor: 'pointer', textTransform: 'uppercase', textAlign: 'left', transition: 'all 0.3s ease', width: '100%' }}>
                  {opt.label}
                </motion.button>
              ))}
            </div>

            <motion.button onClick={handleNext} disabled={!selected} whileHover={selected ? { backgroundColor: '#C9A96E', color: '#080808' } : {}} transition={{ duration: 0.3 }} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.4em', color: selected ? '#F5F5F5' : 'rgba(245,245,245,0.2)', background: 'transparent', border: `1px solid ${selected ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.1)'}`, padding: '16px 48px', cursor: selected ? 'pointer' : 'not-allowed', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>
              {currentQ < QUESTIONS.length - 1 ? 'Next →' : 'Find My Car →'}
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}